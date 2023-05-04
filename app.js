const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// const { MongoClient } = require('mongodb');
const production = require('./config/production.json');


const indexRouter = require('./routes/index');
const burgersRouter = require('./routes/burgers');
const projectsRouter = require('./routes/projects');


const mongoose = require('mongoose');
try {
  mongoose.connect(production.database.localdb);
} catch (error) {
  handleError(error);
}

const app = express();

const corsOptions = {
  origin: 'http://localhost:3002',
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
app.use('/projects', projectsRouter);

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
