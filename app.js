const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/index');
const burgersRouter = require('./routes/burgers');
const gemeentesRouter = require('./routes/gemeentes');
const projectsRouter = require('./routes/projects');
const creatiesRouter = require('./routes/creaties');

dotenv.config();

const mongoLocal = "mongodb://127.0.0.1:27017/buurtplanr";
try {
  mongoose.connect(process.env.MONGO_DB || mongoLocal);
  console.log('MongoDB connected');
} catch (error) {
  console.log('MongoDB connection failed');
  handleError(process.env.MONGO_DB || mongoLocal, error);
}

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3002',
    'http://localhost:3000',
    'https://giddy-cummerbund-cod.cyclic.app/',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3002',
    'https://buurtplanr.vercel.app',
    'https://buurtplanr.com',
    'www.buurtplanr.com',
    'http://buurtplanr.com',
    'http://app.buurtplanr.com',
    'https://app.buurtplanr.com',
    'https://www.app.buurtplanr.com',
    'http://www.buurtplanr.com'
  ]
}
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/burgers', burgersRouter);
app.use('/gemeentes', gemeentesRouter);
app.use('/projects', projectsRouter);
app.use('/creaties', creatiesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
