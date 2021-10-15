const User = require('../models/userModel');
const Session = require('../models/sessionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ slug: req.params.slug }).populate(
    'reviews'
  );

  if (!user) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.createSession = catchAsync(async (req, res, next) => {
  const newSession = await Session.create({});

  if (!newSession) {
    return next(
      new AppError('Something wrong in your session! Try again later', 404)
    );
  }

  res.status(200).json({
    newSession,
  });
});

exports.getSession = catchAsync(async (req, res, next) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    return next(
      new AppError('Session might be already expired or doesnt exist', 404)
    );
  }

  res.status(200).json({
    session,
  });
});
