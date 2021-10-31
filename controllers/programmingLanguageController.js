const ProgrammingLanguage = require('../models/programmingLanguageModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllProgrammingLanguages = catchAsync(async (req, res, next) => {
  const programmingLang = await ProgrammingLanguage.find(
    req.params.id ? { user: req.params.id } : {}
  );

  res.status(200).json({
    status: 'success',
    results: programmingLang.length,
    programmingLang,
  });
});

exports.createProgLanguages = catchAsync(async (req, res) => {
  if (!req.body.user) req.body.user = req.user.id;

  const newProgrammingLanguage = await ProgrammingLanguage.create(req.body);

  res.status(200).json({
    status: 'success',
    programmingLanguage: newProgrammingLanguage,
  });
});

exports.getProgLanguages = catchAsync(async (req, res, next) => {
  if (!req.params.progId) req.params.progId = req.body.id;
  const programmingLang = await ProgrammingLanguage.find(
    req.params.progId ? { _id: req.params.progId } : {}
  );

  res.status(200).json({
    status: 'success',
    programmingLang,
  });
});

exports.updateProgLanguages = catchAsync(async (req, res, next) => {
  if (!req.params.progId) req.params.progId = req.body.id;

  // 1) Crete error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2 Filtered out unwanted fields names that are not allowed
  const filteredBody = filterObj(
    req.body,
    'topic',
    'language',
    'description',
    'ratePerMinute'
  );

  const programmingLang = await ProgrammingLanguage.findByIdAndUpdate(
    req.params.progId ? { _id: req.params.progId } : {},
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!programmingLang) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    programmingLang,
  });
});

exports.deleteProgLanguages = catchAsync(async (req, res, next) => {
  if (!req.params.progId) req.params.progId = req.body.id;

  const programmingLang = await ProgrammingLanguage.findByIdAndDelete(
    req.params.progId ? { _id: req.params.progId } : {}
  );

  if (!programmingLang) {
    return next(
      new AppError('No programming language found with that ID', 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
