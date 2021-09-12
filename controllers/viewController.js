const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.findTutors = catchAsync(async (req, res, next) => {
  const user = await User.find();
  res.status(200).send(user);
});
