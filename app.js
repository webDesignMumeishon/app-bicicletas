var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');


//Getting the routes modules
let indexRouter = require('./routes/index');
// let usersRouter = require('./routes/usuario');
let bicicletasRouter = require('./routes/bicicletas');
let bicicletasAPIRouter = require('./routes/api/bicicletas');
let usuariosAPIRouter = require('./routes/api/usuarios')
let usuariosRouter = require('./routes/usuario')
let tokenRouter = require('./routes/token.js')
const passport = require('./config/passport')
const session = require('express-session')
const Usuario = require('./models/usuario')
// const MongoDBStore = require('connect-mongodb-session')(session);

const store = new session.MemoryStore

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
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  cookie: {maxAge: 240 * 60 * 60 * 1000},
  store: store,
  saveUninitialized: true,
  resave: "true",
  secret: 'red_bicis_app'
}))

app.get('/login', function(req, res){
  res.render('session/login')
})

//credentials are sent for validation in here
app.post('/login', function(req, res, next){
  //passport
  passport.authenticate('local', function(err, usuario, info){
    if(err) return next(err)
    if(!usuario) return res.render('session/login', {info})
    req.logIn(usuario, function(err){
      if(err) return next(err)
      return res.redirect('/')

    })
  })(req, res, next);
})

app.get('logout', function(req, res){
  req.logout()
  res.redirect('/')
})

app.get('/forgotPassword', function(req, res){
  res.render('session/forgotPassword');
})

app.post('/forgotPassword', function(req, res){
  
  Usuario.findOne({ email: req.body.email }, function (err, usuario) {
    if (!usuario) return res.render('session/forgotPassword', {info: {message: 'No existe el usuario'}});
 
    usuario.resetPassword(function(err){
      if (err) return next(err);
      console.log('session/forgotPasswordMessage');
    });

    res.render('session/forgotPasswordMessage');
  });
})

//Setting middlewares for specific paths
app.use('/', indexRouter);
app.use('/token', tokenRouter);
// app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);
app.use('/usuarios', usuariosRouter);


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
