const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const ProgrammingLanguage = require('../models/programmingLanguageModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('profilePic');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // const pageSize = 3;
  const paging = req.query.page * 1 || 1;
  const { language, topics } = req.query;
  // const langauge = req.query.language;
  // const topics = req.query.topics;

  // const totalUsers = await User.countDocuments({});
  // const users = await User.find({})
  //   .populate(['programmingLanguages'])
  //   .limit(pageSize)
  //   .skip(pageSize * page);

  const evaluateLanguage = () => {
    if ((!language || language === 'All') && (!topics || topics === ['All']))
      return {};
    if (language && (!topics || topics === ['All']))
      return { language: language };
    if ((!language || language === 'All') && topics)
      return { topic: { $in: [topics] } };
    if (language && topics)
      return { language: language, topic: { $in: [topics] } };
  };

  console.log(evaluateLanguage());

  const data = ProgrammingLanguage.aggregate([
    {
      $match: evaluateLanguage(),
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
      },
    },
    {
      $group: {
        _id: '$user',
        language: {
          $push: '$language',
        },
      },
    },
    {
      $project: {
        id: 0,
      },
    },
    {
      $sort: {
        ratingsAverage: 1,
        ratingsQuantity: 1,
        _id: 1,
      },
    },
  ]);

  const users = await ProgrammingLanguage.aggregatePaginate(data, {
    page: paging,
    limit: 3,
  });

  res.status(200).json({
    status: 'success',
    users,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
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
    'firstname',
    'lastname',
    'gender',
    'bio',
    'spokenLanguage',
    'address'
  );
  if (req.file) filteredBody.profilePic = req.file.filename;

  // 3 Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate([
    'reviews',
    'programmingLanguages',
    'pendingAppointmentStudent',
    'pendingAppointmentTeacher',
  ]);

  if (!user) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
