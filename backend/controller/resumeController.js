const ResumeDocument = require('../model/ResumeDocument');
const StudentProfile = require('../model/StudentProfile');
const ReviewComment = require('../model/ReviewComment');
const Education = require('../model/Education');
const WorkExperience = require('../model/WorkExperience');
const Project = require('../model/Project');
const Skill = require('../model/Skill');
const Certification = require('../model/Certification');

// Get preview data for active resume
exports.getPreview = async (req, res) => {
  try {
    let studentId = req.query.studentId || req.headers['x-student-id'];
    let profile = studentId ? await StudentProfile.findOne({ studentId }) : await StudentProfile.findOne();

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    const [educations, experiences, projects, skills, certifications, resume] = await Promise.all([
      Education.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      WorkExperience.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      Project.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      Skill.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      Certification.find({ studentProfileId: profile._id }).sort({ order: 1 }),
      ResumeDocument.findOne({ studentProfileId: profile._id }),
    ]);

    const comments = resume ? await ReviewComment.find({ resumeId: resume._id }).sort({ createdAt: -1 }) : [];

    res.status(200).json({
      success: true,
      data: {
        profile,
        educations,
        experiences,
        projects,
        skills,
        certifications,
        resume: resume || {
          templateId: 'creative-rnw',
          accentColor: '#C8102E',
          fontFamily: 'Inter',
          spacingDensity: 'standard',
          status: 'Draft',
        },
        comments,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Generate / update resume configuration and store snapshot
exports.generateResume = async (req, res) => {
  try {
    const { templateId, accentColor, fontFamily, spacingDensity, studentProfileId } = req.body;
    let profileId = studentProfileId;

    if (!profileId) {
      const p = await StudentProfile.findOne();
      profileId = p._id;
    }

    let resume = await ResumeDocument.findOne({ studentProfileId: profileId });
    if (!resume) {
      resume = new ResumeDocument({ studentProfileId: profileId });
    }

    if (templateId) resume.templateId = templateId;
    if (accentColor) resume.accentColor = accentColor;
    if (fontFamily) resume.fontFamily = fontFamily;
    if (spacingDensity) resume.spacingDensity = spacingDensity;

    await resume.save();

    res.status(200).json({
      success: true,
      message: 'Resume styling configured',
      data: resume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Student submits resume for Placement Department Review
exports.submitResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    let resume = await ResumeDocument.findById(resumeId);

    if (!resume) {
      // Find the first resume
      resume = await ResumeDocument.findOne();
    }

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume document not found' });
    }

    resume.status = 'Submitted';
    resume.submissionDate = new Date();
    resume.version = (resume.version || 1) + 1;
    await resume.save();

    // Add a review log / system comment
    await ReviewComment.create({
      resumeId: resume._id,
      reviewerName: 'System / Student',
      reviewerRole: 'Student Submission',
      comment: `Resume version ${resume.version} submitted for Placement Department review.`,
      statusTag: 'Comment',
    });

    res.status(200).json({
      success: true,
      message: 'Resume submitted successfully to Placement Department',
      data: resume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get comments for a resume
exports.getComments = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const comments = await ReviewComment.find({ resumeId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
