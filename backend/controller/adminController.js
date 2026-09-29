const ResumeDocument = require('../model/ResumeDocument');
const StudentProfile = require('../model/StudentProfile');
const ReviewComment = require('../model/ReviewComment');
const Education = require('../model/Education');
const WorkExperience = require('../model/WorkExperience');
const Project = require('../model/Project');
const Skill = require('../model/Skill');
const Certification = require('../model/Certification');

// Get all students with their resume status and filter parameters
exports.getStudents = async (req, res) => {
  try {
    const { branch, course, batch, status, search, minCompletion } = req.query;

    let profileFilter = {};
    if (branch && branch !== 'All') {
      profileFilter.branch = branch;
    }
    if (course && course !== 'All') {
      profileFilter.course = course;
    }
    if (batch && batch !== 'All') {
      profileFilter.batch = batch;
    }
    if (minCompletion) {
      profileFilter.completionPercentage = { $gte: Number(minCompletion) };
    }
    if (search) {
      profileFilter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { targetRole: { $regex: search, $options: 'i' } },
      ];
    }

    const profiles = await StudentProfile.find(profileFilter).sort({ updatedAt: -1 });

    // Fetch corresponding resume documents for each profile
    const profileIds = profiles.map((p) => p._id);
    const resumes = await ResumeDocument.find({ studentProfileId: { $in: profileIds } });
    const resumeMap = new Map();
    resumes.forEach((r) => resumeMap.set(r.studentProfileId.toString(), r));

    // Combine profile with resume info
    let results = profiles.map((p) => {
      const resume = resumeMap.get(p._id.toString()) || {
        _id: null,
        status: 'Draft',
        templateId: 'creative-rnw',
        version: 1,
        submissionDate: null,
      };
      return {
        profile: p,
        resume,
      };
    });

    // Apply status filter if specified
    if (status && status !== 'All') {
      results = results.filter((item) => item.resume.status === status);
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error('Error fetching admin students:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin overview statistics
exports.getStats = async (req, res) => {
  try {
    const totalStudents = await StudentProfile.countDocuments();
    const resumes = await ResumeDocument.find();

    const stats = {
      totalStudents,
      totalResumes: resumes.length,
      draft: 0,
      submitted: 0,
      underReview: 0,
      needsChanges: 0,
      approved: 0,
      rejected: 0,
    };

    resumes.forEach((r) => {
      const s = (r.status || 'Draft').toLowerCase();
      if (s === 'draft') stats.draft++;
      else if (s === 'submitted') stats.submitted++;
      else if (s === 'under review') stats.underReview++;
      else if (s === 'needs changes') stats.needsChanges++;
      else if (s === 'approved') stats.approved++;
      else if (s === 'rejected') stats.rejected++;
    });

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single resume details for admin inspection
exports.getResumeDetail = async (req, res) => {
  try {
    const resumeId = req.params.id;
    let resume = await ResumeDocument.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume document not found' });
    }

    const profile = await StudentProfile.findById(resume.studentProfileId);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const [educations, experiences, projects, skills, certifications, comments] = await Promise.all([
      Education.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      WorkExperience.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      Project.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      Skill.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      Certification.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      ReviewComment.find({ resumeId: resume._id }).sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        profile,
        resume,
        educations,
        experiences,
        projects,
        skills,
        certifications,
        comments,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin reviews resume: updates status, reviewer notes, and adds feedback comment
exports.reviewResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const { status, comment, reviewerName, reviewerRole } = req.body;

    const resume = await ResumeDocument.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume document not found' });
    }

    if (status) {
      resume.status = status;
      resume.reviewedAt = new Date();
      resume.reviewerName = reviewerName || 'Placement Officer (Red & White)';
    }

    if (comment) {
      resume.adminNotes = comment;
    }

    await resume.save();

    // Create a review comment entry
    if (comment) {
      await ReviewComment.create({
        resumeId: resume._id,
        reviewerName: reviewerName || 'Placement Officer (Red & White)',
        reviewerRole: reviewerRole || 'Placement Department',
        comment,
        statusTag: status || 'Comment',
      });
    }

    const comments = await ReviewComment.find({ resumeId: resume._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: `Resume status updated to '${resume.status}' successfully`,
      data: {
        resume,
        comments,
      },
    });
  } catch (error) {
    console.error('Error reviewing resume:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin adds a comment without changing status
exports.addComment = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const { comment, reviewerName, reviewerRole, statusTag } = req.body;

    if (!comment) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const newComment = await ReviewComment.create({
      resumeId,
      reviewerName: reviewerName || 'Placement Admin',
      reviewerRole: reviewerRole || 'Placement Department',
      comment,
      statusTag: statusTag || 'Comment',
    });

    const allComments = await ReviewComment.find({ resumeId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Comment added',
      data: {
        newComment,
        comments: allComments,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
