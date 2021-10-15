const express = require('express');
const authController = require('../controllers/authController');
const veiwController = require('../controllers/viewController');

const router = express.Router();

router.get('/isLoggedIn', authController.isLoggedIn);

router.get('/getUser/:slug', veiwController.getUser);

router.post('/session', veiwController.createSession);
router.get('/session/:id', veiwController.getSession);

module.exports = router;
