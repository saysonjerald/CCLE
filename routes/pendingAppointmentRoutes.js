const express = require('express');
const pendingAppointment = require('../controllers/pendingAppointmentController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(authController.protect, pendingAppointment.createPendingAppointment);

router
  .route('/teacher')
  .get(authController.protect, pendingAppointment.getPendingAppointmentTeacher);

router
  .route('/student')
  .get(authController.protect, pendingAppointment.getPendingAppointmentStudent);

module.exports = router;
