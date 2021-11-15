const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    startingDate: {
      type: Date,
      default: Date.now(),
    },
    expireDate: {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
