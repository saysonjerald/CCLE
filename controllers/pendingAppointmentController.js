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

exports.updatePendingStatusRejected = catchAsync(async (req, res, next) => {
  const pendingStatus = await PendingAppointment.findByIdAndUpdate(
    req.body.appointmentId,
    { pendingStatus: 'Rejected' },
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
