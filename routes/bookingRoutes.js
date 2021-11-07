const express = require('express');
const Booking = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, Booking.getBooking)
  .post(authController.protect, Booking.createBooking);

module.exports = router;
