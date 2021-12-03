const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    startingDate: {
      type: Date,
      unique: true,
    },
    endingDate: {
      type: Date,
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
    programmingLanguage: {
      type: String,
    },
    timeSpend: {
      type: Number,
    },
    session: {
      type: mongoose.Schema.ObjectId,
      ref: 'Session',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

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

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'session',
    select: '_id startingDate expireDate',
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
