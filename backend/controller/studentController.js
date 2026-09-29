const StudentProfile = require('../model/StudentProfile');
const Education = require('../model/Education');
const WorkExperience = require('../model/WorkExperience');
const Project = require('../model/Project');
const Skill = require('../model/Skill');
const Certification = require('../model/Certification');
const ResumeDocument = require('../model/ResumeDocument');
const User = require('../model/User');

// Calculate profile completion percentage
const calculateCompletion = (profile, educations, experiences, projects, skills) => {
  let score = 0;
  if (profile.fullName && profile.email && profile.mobileNumber) score += 20;
  if (profile.city && (profile.targetRole || profile.professionalSummary)) score += 15;
  if (profile.professionalSummary && profile.professionalSummary.length > 30) score += 10;
  if (profile.linkedinUrl || profile.githubUrl || profile.portfolioUrl) score += 10;
  if (educations && educations.length > 0) score += 15;
  if (skills && skills.length >= 3) score += 15;
  if ((projects && projects.length > 0) || (experiences && experiences.length > 0)) score += 15;
  return Math.min(score, 100);
};

// Get current student's full profile bundle
exports.getMyProfile = async (req, res) => {
  try {
    let studentId = req.query.studentId || req.headers['x-student-id'];
    let profile;

    if (studentId) {
      profile = await StudentProfile.findOne({ studentId });
    }

    if (!profile) {
      // Find the first student profile or default seed
      profile = await StudentProfile.findOne();
    }

    if (!profile) {
      return res.status(404).json({ success: false, message: 'No student profile found' });
    }

    const [educations, experiences, projects, skills, certifications, resume] = await Promise.all([
      Education.find({ studentProfileId: profile._id }).sort({ order: 1, createdAt: -1 }),
      WorkExperience.find({ studentProfileId: profile._id }).sort({ order: 1, createdAt: -1 }),
      Project.find({ studentProfileId: profile._id }).sort({ order: 1, createdAt: -1 }),
      Skill.find({ studentProfileId: profile._id }).sort({ order: 1, createdAt: 1 }),
      Certification.find({ studentProfileId: profile._id }).sort({ order: 1, createdAt: -1 }),
      ResumeDocument.findOne({ studentProfileId: profile._id }).sort({ updatedAt: -1 }),
    ]);

    const completion = calculateCompletion(profile, educations, experiences, projects, skills);
    if (profile.completionPercentage !== completion) {
      profile.completionPercentage = completion;
      await profile.save();
    }

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
      },
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update profile details
exports.updateProfile = async (req, res) => {
  try {
    let studentId = req.query.studentId || req.headers['x-student-id'];
    let profile = studentId ? await StudentProfile.findOne({ studentId }) : await StudentProfile.findOne();

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    Object.assign(profile, req.body);
    await profile.save();

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Education CRUD
exports.saveEducation = async (req, res) => {
  try {
    const { _id, studentProfileId, ...data } = req.body;
    let targetProfileId = studentProfileId;

    if (!targetProfileId) {
      const p = await StudentProfile.findOne();
      targetProfileId = p._id;
    }

    let edu;
    if (_id && _id.length === 24) {
      edu = await Education.findByIdAndUpdate(_id, data, { new: true });
    } else {
      edu = await Education.create({ ...data, studentProfileId: targetProfileId });
    }

    res.status(200).json({ success: true, data: edu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Work Experience CRUD
exports.saveExperience = async (req, res) => {
  try {
    const { _id, studentProfileId, ...data } = req.body;
    let targetProfileId = studentProfileId;
    if (!targetProfileId) {
      const p = await StudentProfile.findOne();
      targetProfileId = p._id;
    }

    let exp;
    if (_id && _id.length === 24) {
      exp = await WorkExperience.findByIdAndUpdate(_id, data, { new: true });
    } else {
      exp = await WorkExperience.create({ ...data, studentProfileId: targetProfileId });
    }

    res.status(200).json({ success: true, data: exp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    await WorkExperience.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Project CRUD
exports.saveProject = async (req, res) => {
  try {
    const { _id, studentProfileId, ...data } = req.body;
    let targetProfileId = studentProfileId;
    if (!targetProfileId) {
      const p = await StudentProfile.findOne();
      targetProfileId = p._id;
    }

    let proj;
    if (_id && _id.length === 24) {
      proj = await Project.findByIdAndUpdate(_id, data, { new: true });
    } else {
      proj = await Project.create({ ...data, studentProfileId: targetProfileId });
    }

    res.status(200).json({ success: true, data: proj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Skill CRUD
exports.saveSkill = async (req, res) => {
  try {
    const { _id, studentProfileId, ...data } = req.body;
    let targetProfileId = studentProfileId;
    if (!targetProfileId) {
      const p = await StudentProfile.findOne();
      targetProfileId = p._id;
    }

    let skill;
    if (_id && _id.length === 24) {
      skill = await Skill.findByIdAndUpdate(_id, data, { new: true });
    } else {
      skill = await Skill.create({ ...data, studentProfileId: targetProfileId });
    }

    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Certification CRUD
exports.saveCertification = async (req, res) => {
  try {
    const { _id, studentProfileId, ...data } = req.body;
    let targetProfileId = studentProfileId;
    if (!targetProfileId) {
      const p = await StudentProfile.findOne();
      targetProfileId = p._id;
    }

    let cert;
    if (_id && _id.length === 24) {
      cert = await Certification.findByIdAndUpdate(_id, data, { new: true });
    } else {
      cert = await Certification.create({ ...data, studentProfileId: targetProfileId });
    }

    res.status(200).json({ success: true, data: cert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Batch Save for instant live debounced sync
exports.batchSave = async (req, res) => {
  try {
    const { profile, educations, experiences, projects, skills, certifications, resume } = req.body;
    let studentId = req.query.studentId || req.headers['x-student-id'] || (profile && profile.studentId);

    let currentProfile = studentId
      ? await StudentProfile.findOne({ studentId })
      : await StudentProfile.findOne();

    if (!currentProfile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    // Update profile
    if (profile) {
      const allowedProfileFields = [
        'fullName', 'displayName', 'profilePhoto', 'photoPositionX', 'photoPositionY', 'mobileNumber', 'email',
        'city', 'state', 'country', 'linkedinUrl', 'portfolioUrl', 'githubUrl',
        'behanceUrl', 'dribbbleUrl', 'targetRole', 'professionalSummary',
        'preferredLocation', 'employmentType', 'availability', 'languages',
        'softSkills', 'branch', 'course', 'batch'
      ];
      allowedProfileFields.forEach((field) => {
        if (profile[field] !== undefined) currentProfile[field] = profile[field];
      });
      currentProfile.completionPercentage = calculateCompletion(
        currentProfile,
        educations,
        experiences,
        projects,
        skills
      );
      await currentProfile.save();
    }

    // Sync educations
    if (Array.isArray(educations)) {
      await Education.deleteMany({ studentProfileId: currentProfile._id });
      if (educations.length > 0) {
        const cleanEdu = educations.map((e, idx) => ({
          studentProfileId: currentProfile._id,
          qualification: e.qualification || 'Degree',
          specialization: e.specialization || '',
          institute: e.institute || 'Red & White Multimedia Institute',
          boardOrUniversity: e.boardOrUniversity || '',
          startYear: e.startYear || '',
          endYear: e.endYear || '',
          isPursuing: Boolean(e.isPursuing),
          gradeOrPercentage: e.gradeOrPercentage || '',
          order: idx,
        }));
        await Education.insertMany(cleanEdu);
      }
    }

    // Sync experiences
    if (Array.isArray(experiences)) {
      await WorkExperience.deleteMany({ studentProfileId: currentProfile._id });
      if (experiences.length > 0) {
        const cleanExp = experiences.map((exp, idx) => ({
          studentProfileId: currentProfile._id,
          employmentType: exp.employmentType || 'Internship',
          companyName: exp.companyName || '',
          designation: exp.designation || '',
          location: exp.location || '',
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          isCurrentlyWorking: Boolean(exp.isCurrentlyWorking),
          responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : [],
          achievements: exp.achievements || '',
          order: idx,
        }));
        await WorkExperience.insertMany(cleanExp);
      }
    }

    // Sync projects
    if (Array.isArray(projects)) {
      await Project.deleteMany({ studentProfileId: currentProfile._id });
      if (projects.length > 0) {
        const cleanProj = projects.map((p, idx) => ({
          studentProfileId: currentProfile._id,
          title: p.title || 'Project',
          projectType: p.projectType || 'Academic Capstone',
          role: p.role || 'Developer',
          description: p.description || '',
          technologies: Array.isArray(p.technologies) ? p.technologies : [],
          liveDemoUrl: p.liveDemoUrl || '',
          githubUrl: p.githubUrl || '',
          order: idx,
        }));
        await Project.insertMany(cleanProj);
      }
    }

    // Sync skills
    if (Array.isArray(skills)) {
      await Skill.deleteMany({ studentProfileId: currentProfile._id });
      if (skills.length > 0) {
        const cleanSkills = skills.map((s, idx) => ({
          studentProfileId: currentProfile._id,
          category: s.category || 'Frontend',
          name: s.name || 'Skill',
          proficiencyLevel: s.proficiencyLevel || 'Intermediate',
          order: idx,
        }));
        await Skill.insertMany(cleanSkills);
      }
    }

    // Sync certifications
    if (Array.isArray(certifications)) {
      await Certification.deleteMany({ studentProfileId: currentProfile._id });
      if (certifications.length > 0) {
        const cleanCerts = certifications.map((c, idx) => ({
          studentProfileId: currentProfile._id,
          title: c.title || 'Certification',
          issuer: c.issuer || 'Red & White Skill Education',
          issueDate: c.issueDate || '',
          credentialUrl: c.credentialUrl || '',
          description: c.description || '',
          order: idx,
        }));
        await Certification.insertMany(cleanCerts);
      }
    }

    // Update resume document styling / config
    let currentResume = await ResumeDocument.findOne({ studentProfileId: currentProfile._id });
    if (!currentResume) {
      currentResume = new ResumeDocument({ studentProfileId: currentProfile._id });
    }
    if (resume) {
      if (resume.templateId) currentResume.templateId = resume.templateId;
      if (resume.accentColor) currentResume.accentColor = resume.accentColor;
      if (resume.fontFamily) currentResume.fontFamily = resume.fontFamily;
      if (resume.spacingDensity) currentResume.spacingDensity = resume.spacingDensity;
      if (resume.status) currentResume.status = resume.status;
    }
    currentResume.snapshotData = {
      profile: currentProfile,
      educations,
      experiences,
      projects,
      skills,
      certifications,
      updatedAt: new Date(),
    };
    await currentResume.save();

    res.status(200).json({
      success: true,
      message: 'Batch auto-saved successfully',
      data: {
        completionPercentage: currentProfile.completionPercentage,
        updatedAt: new Date(),
        resume: currentResume,
      },
    });
  } catch (error) {
    console.error('Error in batch save:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
