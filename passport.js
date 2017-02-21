const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/schema/userSchema');
const ObjectId = require('mongodb').ObjectId;
require('./model/db');

passport.use(new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({ passReqToCallback: true }, register));

function authenticate (email, password, done) {
  User.db.collection('tutorialFinderUsers').find({email}).toArray((err, user) => {
    if (err) return done(null, false, {message: err});
    if (user.length === 0 || !bcrypt.compareSync(password, user[0].password)) {
      return done(null, false, {message: 'Invalid user and password combination'});
    }
    done(null, user[0]);
  });
}

function register (req, email, password, done) {
  console.log(req.query);
  User.db.collection('tutorialFinderUsers').findOne({email}, (err, user) => {
    if (err) return done(null, false, {message: err});
    if (user) {
      return done(null, false, {message: 'an account with that email has already been created'});
    }

    // if there is no user with that email
    // create the user
    var newUser = new User();

    // set the user's local credentials
    newUser.fname = req.query.first_name;
    newUser.lname = req.query.last_name;
    newUser.email = email;
    newUser.password = bcrypt.hashSync(password);

    // save the user
    newUser.save(function (err) {
      if (err) {
        throw err;
      }
      return done(null, newUser);
    });
  });
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.db.collection('tutorialFinderUsers').find({_id: ObjectId(id)}).toArray((err, user) => {
    if (err) return done(null, false, {message: err});
    done(null, user);
  });
});
