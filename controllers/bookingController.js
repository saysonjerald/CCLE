const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');

exports.createBooking = catchAsync(async (req, res) => {
  const newBooking = await Booking.create(req.body);

  res.status(200).json({
    status: 'success',
    Booking: newBooking,
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  if (!req.body.teacher) req.body.teacher = req.params.teacher;
  if (!req.body.student) req.body.student = req.user.id;
  const query =
    req.user.id !== req.params.teacher
      ? { teacher: req.body.teacher, student: req.body.student }
      : { teacher: req.user.id };

  const BookingTeacher = await Booking.find(query);

  res.status(200).json({
    status: 'success',
    BookingTeacher,
  });
});
