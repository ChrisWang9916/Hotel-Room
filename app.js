var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const rooms = require("./routes/rooms");
const employees = require("./routes/employees");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/rooms', rooms.findAll);
app.get('/rooms/:id', rooms.findOneById);
app.get('/rooms/:roomNumber', rooms.findByRoomNumber);
app.get('/staff', employees.findAll);
app.get('/staff/:id', employees.findById);
app.get('/staffN/:name', employees.findByName);

app.put('/rooms/:id',rooms.changeAvailable);
app.put('/increase/:id',rooms.increasePrice);
app.put('/decrease/:id',rooms.decreasePrice);
app.put('/raise/:id',employees.raiseSalary);
app.put('/paycut/:id',employees.ReduceSalary);

app.post('/rooms',rooms.addRoom);
app.post('/staff',employees.addE);

app.delete('/rooms/:id', rooms.deleteRoom);
app.delete('/staff/:id', employees.deleteE);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
