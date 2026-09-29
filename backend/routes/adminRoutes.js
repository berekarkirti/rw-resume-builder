const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// List students with resume status and filters
router.get('/students', adminController.getStudents);

// Dashboard overview stats
router.get('/stats', adminController.getStats);

// Single student resume view
router.get('/resume/:id', adminController.getResumeDetail);

// Placement review action (status change + feedback comment)
router.post('/resume/:id/review', adminController.reviewResume);

// Add review feedback comment
router.post('/resume/:id/comment', adminController.addComment);

module.exports = router;
