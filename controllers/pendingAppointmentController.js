const PendingAppointment = require('../models/pendingAppointmentModel');
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