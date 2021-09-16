const User = require('../models/userModel');
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
