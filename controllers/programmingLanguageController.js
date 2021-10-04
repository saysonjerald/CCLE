const ProgrammingLanguage = require('../models/programmingLanguageModel');
const catchAsync = require('../utils/catchAsync');

exports.createProgLanguages = catchAsync(async (req, res) => {
  if (!req.body.user) req.body.user = req.user.id;

  const newProgrammingLanguage = await ProgrammingLanguage.create(req.body);

  res.status(200).json({
    status: 'success',
    programmingLanguage: newProgrammingLanguage,
  });
});
