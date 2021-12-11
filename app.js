const express = require('express');
const morgan = require('morgan');
const ratelimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRoute = require('./routes/userRoutes');
const viewRoute = require('./routes/viewRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const programmingLanguageRoutes = require('./routes/programmingLanguageRoutes');
const pendingAppointmentRoutes = require('./routes/pendingAppointmentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// app.set('view engine', 'ejs');

// Allow CORS
app.use(cors({ origin: true, credentials: true }));
app.options('*', cors());

// Set Http headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}
// limit request from same API
const limiter = ratelimit({
  max: 100,
  windowsMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ extended: false, limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization againt XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(express.static(`${__dirname}/public`));

// For view route
app.use('/', viewRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/programmingLanguage', programmingLanguageRoutes);
app.use('/api/v1/pendingAppointment', pendingAppointmentRoutes);
app.use('/api/v1/booking', bookingRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
