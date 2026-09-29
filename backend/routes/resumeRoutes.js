const express = require('express');
const router = express.Router();
const resumeController = require('../controller/resumeController');

// Resume preview & compilation
router.get('/preview', resumeController.getPreview);

// Generate / save styling config & snapshot
router.post('/generate', resumeController.generateResume);

// Submit for review
router.post('/:id/submit', resumeController.submitResume);

// Comments
router.get('/:id/comments', resumeController.getComments);

module.exports = router;
