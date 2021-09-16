const express = require('express');
const authController = require('../controllers/authController');
const veiwController = require('../controllers/viewController');

const router = express.Router();

router.get('/isLoggedIn', authController.isLoggedIn);

router.get('/getUser/:slug', veiwController.getUser);

module.exports = router;
