const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewRoutes = require('./reviewRoutes');
const programmingLanguageRoutes = require('./programmingLanguageRoutes');
const pendingAppointmentRoutes = require('./pendingAppointmentRoutes');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/verifyEmail/:emailToken', authController.verifyAccount);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch('/dateleMe', authController.protect, userController.deleteMe);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.use('/:id/programmingLanguage', programmingLanguageRoutes);
router.use('/:revieweeId/reviews', reviewRoutes);
router.use('/:teacher/pendingAppointment', pendingAppointmentRoutes);
router.use('/:teacher/pendingAppointment/teacher', pendingAppointmentRoutes);
router.use('/:teacher/pendingAppointment/student', pendingAppointmentRoutes);

module.exports = router;
