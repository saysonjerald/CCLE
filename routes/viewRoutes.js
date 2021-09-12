const express = require('express');
const authController = require('../controllers/authController');
const veiwController = require('../controllers/viewController');

const router = express.Router();

router.get('/isLoggedIn', authController.isLoggedIn);

router.get('/find-tutors', veiwController.findTutors);

module.exports = router;
