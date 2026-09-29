const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/lookups', authController.getLookups);
router.get('/users', authController.getUsers);
router.post('/reset-seed', authController.resetSeed);

module.exports = router;
