const mongoose = require('mongoose');

const pendingAppointmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User account is required to set appointment'],
    },
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'You must set appointment to a user'],
    },
    startingDate: {
      type: Date,
    },
    endingDate: {
      type: Date,
    },
    programmingLanguage: {
      type: String,
    },
    timeSpend: {
      type: Number,
    },
    ratePerMinute: {
      type: Number,
    },
    totalRate: {
      type: Number,
    },
    totalCommission: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    pendingStatus: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Accepted', 'Rejected'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// pendingAppointmentSchema.index({ startingDate: 1 }, { unique: true });

pendingAppointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'student',
    select: 'firstname lastname profilePic',
  });

  next();
});

pendingAppointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'teacher',
    select: 'firstname lastname profilePic',
  });

  next();
});

const PendingAppointment = mongoose.model(
  'PendingAppointment',
  pendingAppointmentSchema
);

module.exports = PendingAppointment;
