const mongoose = require('mongoose');

const pendingAppointmentSchema = new mongoose.Schema(
  {
    startingDate: {
      type: Date,
      default: Date.now(),
    },
    endingDate: {
      type: Date,
      default: Date.now() + 2 * 24 * 60 * 60 * 1000,
      validate: {
        //This only works on CREATE and SAVE!
        validator: function (el) {
          return el > this.startingDate;
        },
        message: 'End Date must be greater than Starting Date!',
      },
    },
    isPending: {
      type: Boolean,
      default: true,
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
