const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// Profile
router.get('/me/profile', studentController.getMyProfile);
router.patch('/me/profile', studentController.updateProfile);
router.put('/me/batch-save', studentController.batchSave);

// Education
router.post('/me/education', studentController.saveEducation);
router.delete('/me/education/:id', studentController.deleteEducation);

// Work Experience
router.post('/me/experience', studentController.saveExperience);
router.delete('/me/experience/:id', studentController.deleteExperience);

// Projects
router.post('/me/projects', studentController.saveProject);
router.delete('/me/projects/:id', studentController.deleteProject);

// Skills
router.post('/me/skills', studentController.saveSkill);
router.delete('/me/skills/:id', studentController.deleteSkill);

// Certifications
router.post('/me/certifications', studentController.saveCertification);
router.delete('/me/certifications/:id', studentController.deleteCertification);

module.exports = router;
