const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    programmingLanguage: {
      type: String,
    },
    startingDate: {
      type: Date,
    },
    endingDate: {
      type: Date,
    },
    timeSpend: {
      type: Number,
    },
    grossPay: {
      type: Number,
    },
    commission: {
      type: Number,
    },
    netPay: {
      type: Number,
    },
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'You must set appointment to a user'],
    },
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User account is required to set appointment'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// bookingSchema.index({ startingDate: 1 }, { unique: true });

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'student',
    select: 'firstname lastname profilePic',
  });

  next();
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'teacher',
    select: 'firstname lastname profilePic',
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
