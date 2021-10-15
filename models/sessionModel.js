const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    startingDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
