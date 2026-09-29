const User = require('../model/User');
const StudentProfile = require('../model/StudentProfile');
const InstituteCatalog = require('../model/InstituteCatalog');
const seedDatabase = require('../seed');
const { ensureInstituteCatalog } = require('../utils/ensureCatalog');
const { RNW_BRANCHES, RNW_COURSES, TARGET_ROLES } = require('../data/instituteCatalog');

exports.getLookups = async (req, res) => {
  try {
    let catalog = await InstituteCatalog.findOne({ key: 'default' });
    if (!catalog || !catalog.branches?.length) {
      catalog = await ensureInstituteCatalog();
    }
    res.status(200).json({
      success: true,
      data: {
        branches: catalog.branches?.length ? catalog.branches : RNW_BRANCHES,
        courses: catalog.courses?.length ? catalog.courses : RNW_COURSES,
        targetRoles: catalog.targetRoles?.length ? catalog.targetRoles : TARGET_ROLES,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get available test users (Students and Placement Admins)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    const studentProfiles = await StudentProfile.find().select('studentId fullName course branch completionPercentage');
    res.status(200).json({
      success: true,
      data: {
        users,
        studentProfiles,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reset & re-seed test data
exports.resetSeed = async (req, res) => {
  try {
    const result = await seedDatabase(false);
    res.status(200).json({
      success: true,
      message: 'Database seeded successfully with Red & White Multimedia Institute sample students and resumes',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
