var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//Getting the routes modules
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');


var app = express();

//importing mongoose
let mongoose = require('mongoose')
//This is to establish the connection
let mongoDB = 'mongodb://localhost/red_bicicletas'
//Setting up the db
mongoose.connect(mongoDB, {useNewUrlParser: true})
mongoose.Promise= global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDN connection error'))

// view engine setup. In views directory all the templates are set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setting middlewares for specific paths
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);


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
