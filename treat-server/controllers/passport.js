const passport    = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
let User = require('../models/User.js');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: 'Invalid email or password.' });
      });
    });


    // return User.findOne({email, password})
    //   .then(user => {
    //     if (!user) {
    //       return cb(null, false, {message: 'Incorrect email or password.'});
    //     }
    //
    //     return cb(null, user, {
    //       message: 'Logged In Successfully'
    //     });
    //   })
    //   .catch(err => {
    //     return cb(err);
    //   });
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret_123'
  },
  function (jwtPayload, cb) {
    return User.findOneById(jwtPayload.id)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));
