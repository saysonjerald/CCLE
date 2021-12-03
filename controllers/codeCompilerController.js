const { c, cpp, node, python, java } = require('compile-run');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const setMode = (lang) => {
  switch (lang) {
    case 'C':
      return c;
    case 'C++':
      return cpp;
    case 'JavaScript':
      return node;
    case 'Python':
      return python;
    case 'Java':
      return java;
    default:
      return '';
  }
};

exports.compile = catchAsync(async (req, res, next) => {
  const result = await setMode(req.body.language).runSource(
    req.body.codeString
  );

  if (!result) {
    next(new AppError('Failed to compile', 404));
  }

  res.status(200).json({
    success: 'success',
    result,
  });
});
