var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var drinksRouter = require('./routes/drinks');
var foodRouter = require('./routes/food');
var orderRouter = require('./routes/order');
var reservationRouter = require('./routes/reservation');
var tableRouter = require('./routes/table');
var waiterRouter = require('./routes/waiter');
var loginRouter = require('./routes/login');
var resturantRouter = require('./routes/resturant');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var corsOptions = {
	origin: "*"
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/drinks/', drinksRouter);
app.use('/food/', foodRouter);
app.use('/order/', orderRouter);
app.use('/reservation/', reservationRouter);
app.use('/table/', tableRouter);
app.use('/waiter/', waiterRouter);
app.use('/login/', loginRouter);
app.use('/resturant/', resturantRouter);


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
