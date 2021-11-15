const express = require('express');
const booking = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const sessionController = require('../controllers/sessionController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, booking.getBooking)
  .post(
    authController.protect,
    booking.validate,
    sessionController.createSession,
    booking.createBooking
  );

router
  .route('/:startingDate')
  .get(authController.protect, booking.getBookingbyDate);

module.exports = router;
