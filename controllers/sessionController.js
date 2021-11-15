const Session = require('../models/sessionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createSession = catchAsync(async (req, res, next) => {
  const offsettime = 10;
  const newSession = await Session.create(req.body);

  if (!newSession) {
    return next(new AppError('Error: Creating session failed.'));
  }

  newSession.startingDate = new Date(newSession.startingDate).setMinutes(
    new Date(newSession.startingDate).getMinutes() - offsettime
  );

  await newSession.save();

  req.sessionId = newSession._id;
  next();
});
