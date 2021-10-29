const PendingAppointment = require('../models/pendingAppointment');
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
  const pendingAppointmentTeacher = await PendingAppointment.find(
    req.params.teacher ? { teacher: req.params.teacher } : {}
  );

  res.status(200).json({
    status: 'success',
    pendingAppointmentTeacher,
  });
});

exports.getPendingAppointmentStudent = catchAsync(async (req, res, next) => {
  if (!req.body.student) req.body.student = req.user.id;
  if (!req.body.teacher) req.body.teacher = req.params.teacher;

  const pendingAppointmentStudent = await PendingAppointment.find(
    req.body.student !== req.body.teacher
      ? { student: req.user.id, teacher: req.params.teacher }
      : { student: req.user.id }
  );

  res.status(200).json({
    status: 'success',
    pendingAppointmentStudent,
  });
});
