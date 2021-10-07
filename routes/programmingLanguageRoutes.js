const express = require('express');
const programmingLanguageController = require('../controllers/programmingLanguageController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(programmingLanguageController.getAllProgrammingLanguages)
  .post(
    authController.protect,
    programmingLanguageController.createProgLanguages
  );

router
  .route('/:progId')
  .get(programmingLanguageController.getProgLanguages)
  .patch(programmingLanguageController.updateProgLanguages)
  .delete(programmingLanguageController.deleteProgLanguages);

module.exports = router;
