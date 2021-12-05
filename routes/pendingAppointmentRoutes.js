const express = require('express');
const pendingAppointment = require('../controllers/pendingAppointmentController');
const booking = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    booking.validate,
    pendingAppointment.createPendingAppointment
  )
  .delete(authController.protect, pendingAppointment.deletePendingAppointment);

router
  .route('/teacher')
  .get(authController.protect, pendingAppointment.getPendingAppointmentTeacher);

router
  .route('/student')
  .get(authController.protect, pendingAppointment.getPendingAppointmentStudent);

router
  .route('/student/update')
  .patch(
    authController.protect,
    pendingAppointment.validate,
    pendingAppointment.updatePendingStatus
  );

router
  .route('/teacher/update')
  .patch(authController.protect, pendingAppointment.updatePendingStatus);

module.exports = router;
