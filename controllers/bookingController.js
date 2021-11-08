const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createBooking = catchAsync(async (req, res, next) => {
  const newBooking = await Booking.create(req.body);

  if (!newBooking) {
    return next(new AppError('Booking Failed! Avoid duplicate schedules'));
  }

  next();
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

exports.validate = catchAsync(async (req, res, next) => {
  if (!req.body.teacher) req.body.teacher = req.params.teacher;

  const existingBooked = await Booking.find({
    teacher: req.body.teacher,
    startingDate: { $lt: req.body.endingDate },
    endingDate: { $gt: req.body.startingDate },
  });

  if (existingBooked.length !== 0) {
    return next(new AppError('Someone already booked this timeframe', 404));
  }

  next();
});
