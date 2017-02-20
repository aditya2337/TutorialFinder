const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/schema/userSchema');
const ObjectId = require('mongodb').ObjectId;
require('./model/db');

passport.use(new LocalStrategy(authenticate));

function authenticate (email, password, done) {
  User.db.collection('tutorialFinderUsers').find({email}).toArray((err, user) => {
    if (err) return done(null, false, {message: err});
    if (user.length === 0 || !bcrypt.compareSync(password, user[0].password)) {
      return done(null, false, {message: 'Invalid user and password combination'});
    }
    done(null, user);
  });
}

passport.serializeUser((user, done) => {
  done(null, user[0]._id);
});

passport.deserializeUser((id, done) => {
  User.db.collection('tutorialFinderUsers').find({_id: ObjectId(id)}).toArray((err, user) => {
    if (err) return done(null, false, {message: err});
    done(null, user);
  });
});
