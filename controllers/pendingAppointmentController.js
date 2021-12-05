const PendingAppointment = require('../models/pendingAppointmentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createPendingAppointment = catchAsync(async (req, res) => {
  if (!req.body.teacher) req.body.teacher = req.params.teacher;
  if (!req.body.student) req.body.student = req.user.id;

  const newPendingAppointment = await PendingAppointment.create(req.body);

  res.status(200).json({
    status: 'success',
    pendingAppointment: newPendingAppointment,
  });
});

exports.deletePendingAppointment = catchAsync(async (req, res, next) => {
  const deletedAppointment = await PendingAppointment.findByIdAndDelete(
    req.body._id
  );

  if (!deletedAppointment) {
    return next(new AppError('No Appointment found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getPendingAppointmentTeacher = catchAsync(async (req, res, next) => {
  if (!req.body.teacher) req.body.teacher = req.params.teacher;
  if (!req.body.student) req.body.student = req.user.id;
  const query =
    req.user.id !== req.params.teacher
      ? { teacher: req.body.teacher, student: req.body.student }
      : { student: req.body.student };

  const pendingAppointmentTeacher = await PendingAppointment.find(query);

  res.status(200).json({
    status: 'success',
    pendingAppointmentTeacher,
  });
});

exports.getPendingAppointmentStudent = catchAsync(async (req, res, next) => {
  if (!req.body.student) req.body.student = req.user.id;
  if (!req.body.teacher) req.body.teacher = req.params.teacher;

  const pendingAppointmentStudent = await PendingAppointment.find({
    teacher: req.user.id,
  });

  res.status(200).json({
    status: 'success',
    pendingAppointmentStudent,
  });
});

exports.updatePendingStatusAccept = catchAsync(async (req, res, next) => {
  const pendingStatus = await PendingAppointment.findByIdAndUpdate(
    req.body.appointmentId,
    { pendingStatus: 'Accepted' },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!pendingStatus)
    return next(new AppError('Failed to update pending status', 404));

  res.status(200).json({
    status: 'success',
    pendingStatus,
  });
});

exports.updatePendingStatus = catchAsync(async (req, res, next) => {
  const pendingStatus = await PendingAppointment.findByIdAndUpdate(
    req.body.appointmentId,
    { pendingStatus: req.body.pendingStatus },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!pendingStatus)
    return next(new AppError('Failed to reject pending status', 404));

  res.status(200).json({
    status: 'success',
    pendingStatus,
  });
});

exports.validate = catchAsync(async (req, res, next) => {
  if (req.body.pendingStatus !== 'Rejected') {
    if (!req.body.teacher) req.body.teacher = req.params.teacher;
    const endingDateType = new Date(req.body.endingDate);
    const startingDateType = new Date(req.body.startingDate);

    const existingAppointment = await PendingAppointment.find({
      teacher: req.body.teacher,
      pendingStatus: 'Accepted',
      startingDate: { $lt: endingDateType },
      endingDate: { $gt: startingDateType },
    });

    if (existingAppointment.length !== 0) {
      return next(
        new AppError(
          `This timeframe is already occupied by the other user under your accepted appointment. Plese choose another timeframe.`,
          404
        )
      );
    }
  }

  next();
});
