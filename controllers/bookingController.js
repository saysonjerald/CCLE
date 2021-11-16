const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createBooking = catchAsync(async (req, res, next) => {
  const newBooking = await Booking.create(req.body);

  if (!newBooking) {
    return next(new AppError('Booking Failed! Avoid duplicate schedules'));
  }

  newBooking.session = req.sessionId;
  await newBooking.save();

  res.status(200).json({
    status: 'success',
    newBooking,
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  if (!req.body.teacher) req.body.teacher = req.params.teacher;
  if (!req.body.student) req.body.student = req.user.id;
  const query =
    req.user.id !== req.body.teacher
      ? {
          $or: [
            { student: req.body.teacher, teacher: req.user.id },
            { teacher: req.body.teacher, student: req.user.id },
          ],
        }
      : { $or: [{ teacher: req.user.id }, { student: req.user.id }] };

  const Booked = await Booking.find(query);

  res.status(200).json({
    status: 'success',
    Booked,
  });
});

exports.getBookingbyDate = catchAsync(async (req, res, next) => {
  const bookedbyDate = await Booking.find({
    startingDate: req.params.startingDate,
  });

  if (!bookedbyDate) {
    return next(new AppError('Error: No booking schedule on that date', 404));
  }

  res.status(200).json({
    success: 'success',
    bookedbyDate,
  });
});

exports.validate = catchAsync(async (req, res, next) => {
  if (!req.body.student) req.body.student = req.user.id;
  if (!req.body.teacher) req.body.teacher = req.params.teacher;

  const endingDateType = new Date(req.body.endingDate);
  const startingDateType = new Date(req.body.startingDate);

  const existingBooked = await Booking.find({
    teacher: req.body.teacher,
    startingDate: { $lt: endingDateType },
    endingDate: { $gt: startingDateType },
  });

  const existingUserBooked = await Booking.find({
    teacher: req.body.student,
    startingDate: { $lt: endingDateType },
    endingDate: { $gt: startingDateType },
  });

  if (existingBooked.length !== 0) {
    return next(
      new AppError(
        `This timeframe is already occupied by the other user under this teacher's appointment. Plese choose another timeframe.`,
        404
      )
    );
  }

  if (existingUserBooked.length !== 0) {
    return next(
      new AppError(
        `You already have an appointment on this schedule. Plese choose another timeframe.`,
        404
      )
    );
  }

  next();
});
