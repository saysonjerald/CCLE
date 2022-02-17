const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const programmingLanguageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to user'],
    },
    language: {
      type: String,
      required: [true, 'Programming Language cannot be empty!'],
      enum: [
        'C#',
        'C++',
        'Go',
        'Java',
        'Kotlin',
        'Lua',
        'JavaScript',
        'Pascal',
        'Perl',
        'Php',
        'Phython3',
        'R',
        'Ruby',
        'Shell',
        'SQL',
        'Swift',
      ],
    },
    topic: {
      type: [String],
      required: [true, 'Topic cannot be empty!'],
      enum: [
        'Syntax',
        'Data Types',
        'Variables',
        'Keywords',
        'Basic Operations',
        'Loops',
        'Numbers',
        'Characters',
        'Arrays',
        'Strings',
        'Functions',
        'Others',
      ],
    },
    description: {
      type: String,
      require: [true, 'Description connot be empty!'],
    },
    ratePerMinute: {
      type: Number,
      require: [true, 'Adding programming language requires rate per minute!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

programmingLanguageSchema.plugin(aggregatePaginate);

const ProgrammingLanguage = mongoose.model(
  'ProgrammingLanguage',
  programmingLanguageSchema
);

module.exports = ProgrammingLanguage;
