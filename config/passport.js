const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const Usuario = require('../models/usuario')

passport.use(new localStrategy(
    function(email, password, done){
        Usuario.findOne({email:email} , function (err, usuario){
            if(err) return done(err)
            if(!usuario) return done(null, false, {message: 'Invalid Email'})
            if(!usuario.validPassword(password)) return done(null, false, {message: 'Invalid password'})
            return done(null,usuario)
        })
    }
))

passport.serializeUser(function(user, cb){
    cb(null, user.id)
})


//from internet
passport.deserializeUser((_id, done) => {

    User.findById( _id, (err, user) => {
      if(err){
          done(null, false, {error:err});
      } else {
          done(null, user);
      }
    });
});

module.exports= passport