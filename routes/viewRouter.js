const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
router.get('/verifyUser', authController.verifyUser);
module.exports = router;
