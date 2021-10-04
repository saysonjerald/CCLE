const express = require('express');
const programmingLanguageController = require('../controllers/programmingLanguageController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    programmingLanguageController.createProgLanguages
  );

module.exports = router;
