const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find(
    req.params.revieweeId ? { reviewee: req.params.revieweeId } : {}
  );

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    reviews,
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find(
    req.params.revieweeId
      ? { reviewee: req.params.revieweeId, user: req.params.id }
      : {}
  );

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    reviews,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.revieweeId) req.body.reviewee = req.params.revieweeId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    review: newReview,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.body.id, {
    review: req.body.review,
    rating: req.body.rating,
  });

  if (!review) {
    next(new AppError('Updating review failed. Please try again later', 404));
  }

  res.status(200).json({
    status: 'success',
    review,
  });
});
