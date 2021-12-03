const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// const slugify = require('slugify');
// const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please tell us your first name'],
    },
    lastname: {
      type: String,
      required: [true, 'Please tell us your last name'],
    },
    profilePic: {
      type: String,
      default: 'default.jpg',
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Please provide your gender'],
    },
    bio: {
      type: String,
    },
    spokenLanguage: {
      type: [String],
      enum: [
        'Arabic',
        'Armenian',
        'Azerbaijani',
        'Basque',
        'Belarusian',
        'Bengali',
        'Bosnian',
        'Bulgarian',
        'Catalan',
        'Cebuano',
        'Chichewa',
        'Chinese',
        'Corsican',
        'Croatian',
        'Czech',
        'Danish',
        'Dutch',
        'English',
        'Esperanto',
        'Estonian',
        'Filipino',
        'Finnish',
        'French',
        'Frisian',
        'Galician',
        'Georgian',
        'German',
        'Greek',
        'Gujarati',
        'Haitian Creole',
        'Hausa',
        'Hawaiian',
        'Hebrew',
        'Hindi',
        'Hmong',
        'Hungarian',
        'Icelandic',
        'Igbo',
        'Indonesian',
        'Irish',
        'Italian',
        'Japanese',
        'Javanese',
        'Kannada',
        'Kazakh',
        'Khmer',
        'Kinyarwanda',
        'Korean',
        'Kurdish (Kurmanji)',
        'Kyrgyz',
        'Lao',
        'Latin',
        'Latvian',
        'Lithuanian',
        'Luxembourgish',
        'Macedonian',
        'Malagasy',
        'Malay',
        'Malayalam',
        'Maltese',
        'Maori',
        'Marathi',
        'Mongolian',
        'Myanmar (Burmese)',
        'Nepali',
        'Norwegian',
        'Odia (Oriya)',
        'Pashto',
        'Persian',
        'Polish',
        'Portuguese',
        'Punjabi',
        'Romanian',
        'Samoan',
        'Scots Gaelic',
        'Serbian',
        'Sesotho',
        'Shona',
        'Sindhi',
        'Sinhala',
        'Slovak',
        'Slovenian',
        'Somali',
        'Spanish',
        'Sundanese',
        'Swahili',
        'Swedish',
        'Tajik',
        'Tamil',
        'Tatar',
        'Telugu',
        'Thai',
        'Turkish',
        'Turkmen',
        'Ukrainian',
        'Urdu',
        'Uyghur',
        'Uzbek',
        'Vietnamese',
        'Welsh',
        'Xhosa',
        'Yiddish',
        'Yoruba',
        'Zulu',
      ],
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        //This only works on CREATE and SAVE!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    emailToken: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    // passwordResetToken: String,
    // passwordResetExpires: Date,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [0, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'reviewee',
  localField: '_id',
});

userSchema.virtual('programmingLanguages', {
  ref: 'ProgrammingLanguage',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('pendingAppointmentStudent', {
  ref: 'PendingAppointment',
  foreignField: 'student',
  localField: '_id',
});

userSchema.virtual('pendingAppointmentTeacher', {
  ref: 'PendingAppointment',
  foreignField: 'teacher',
  localField: '_id',
});

userSchema.pre('save', async function (next) {
  //Only runthis function if password was actually modified
  if (!this.isModified('password')) return next();

  //Hash te password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// userSchema.pre('save', function (next) {
//   this.slug = slugify(`${this.firstname} ${this.lastname} ${uuidv4()}`, {
//     lower: true,
//   });
//   next();
// });

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  //False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 100 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createEmailToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.emailToken = crypto.createHash('sha256').update(token).digest('hex');

  return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
