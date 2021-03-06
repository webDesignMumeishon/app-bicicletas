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
let authAPIRouter = require('./routes/api/auth')
let usuariosRouter = require('./routes/usuario')
let tokenRouter = require('./routes/token.js')
const passport = require('./config/passport')
const session = require('express-session')
const Usuario = require('./models/usuario')
const jwt = require('jsonwebtoken')
// const MongoDBStore = require('connect-mongodb-session')(session);

//The session is stored in the server's memory
//If the server is closed, it forgets all the logged users, thus, users have to authenticate again
const store = new session.MemoryStore

var app = express();


app.set('secretKey', 'jwt_pwd_!!223344');

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
app.use(cookieParser());
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Passport is initialized
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')));

//Here is configurated the cookie for the session
app.use(session({
  //here we define how long the cookie lasts, when it expires
  cookie: {maxAge: 240 * 60 * 60 * 1000},
  //Here is defined where the session is stored (it is in the store variable defined above)
  store: store,
  saveUninitialized: true,
  resave: "true",
  // secret: generates the encrypted identifier for the cookie. Is the seed of the code generator use to 
  // identify the session
  secret: 'red_bicis_app_adasd_asdasd'
}))

app.get('/login', function(req, res){
  res.render('session/login')
})

//credentials are sent for validation in here
app.post('/login', function(req, res, next){
  //passport - here we start working with passport
  // authentica is a passport method. in the first argument is declared the strategy
  //here we decalre the function to pass to config/passport.js
  passport.authenticate('local', function(err, usuario, info){
    if(err) return next(err)
    if(!usuario) return res.render('session/login', {info})
    req.logIn(usuario, function(err){
      if(err) return next(err)
      return res.redirect('/')

    })
  })(req, res, next);
})


app.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy(function (err) {
    if (err) { return next(err); }
    // The response should indicate that the user is no longer authenticated.
    // return res.send({ authenticated: req.isAuthenticated() });
    res.redirect('/');
  });
});



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

app.get('/resetPassword/:token',  function(req, res, next){
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token) return res.status(400).send({ type: 'not-verified', msg:  'No existe el token.'});

    Usuario.findById(token._userId, function (err, usuario) {
      if (!usuario) return res.status(400).send({ type: 'not-verified', msg:  'No existe un usuario al token.'});
      res.render('session/resetPassword', {errors: {}, usuario: usuario});
    });
  });
});

//Setting middlewares for specific paths
app.use('/', indexRouter);
app.use('/token', tokenRouter);
// app.use('/users', usersRouter);
app.use('/bicicletas', loggedIn, bicicletasRouter);
app.use('/api/auth', authAPIRouter); 
app.use('/api/bicicletas', bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);
app.use('/usuarios', usuariosRouter);

function loggedIn(req, res, next){
  if(req.session.passport){
    next()
  }
  else{
    console.log("User is not Logged in")
    res.redirect('/login')
  }
}

function validarUsuario(req,res,next){
  jwt.verify(req,headers['x-access-token'], req.app.get['secretKey'], function(err, decoded){
    if(err){
      res.json({
        status: "error",
        message: err.message, data:null
      })
    }else{
      req.body.userId = decoded.id
      console.log('jwt verify: ' + decoded)
      next()
    }
  })
}


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

