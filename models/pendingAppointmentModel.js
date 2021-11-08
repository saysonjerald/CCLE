const mongoose = require('mongoose');

const pendingAppointmentSchema = new mongoose.Schema(
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
    pendingStatus: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Accepted', 'Rejected'],
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
