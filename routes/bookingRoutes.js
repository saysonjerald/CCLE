const express = require('express');
const booking = require('../controllers/bookingController');
const pendingAppointment = require('../controllers/pendingAppointmentController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, booking.getBooking)
  .post(
    authController.protect,
    booking.validate,
    booking.createBooking,
    pendingAppointment.updatePendingStatusAccept
  );

module.exports = router;
