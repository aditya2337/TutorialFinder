const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('./model/db');
const ObjectId = require('mongodb').ObjectId;

passport.use(new LocalStrategy(authenticate));

function authenticate (email, password, done) {
  mongo.db.collection('tutorialFinderUsers').find({email}).toArray((err, user) => {
    if (err) return done(null, false, {message: err});
    if (user.length === 0 || user[0].password !== password) {
      return done(null, false, {message: 'Invalid user and password combination'});
    }
    done(null, user);
  });
}

passport.serializeUser((user, done) => {
  done(null, user[0]._id);
});

passport.deserializeUser((id, done) => {
  mongo.db.collection('users').find({_id: ObjectId(id)}).toArray((err, user) => {
    if (err) return done(null, false, {message: err});
    done(null, user);
  });
});
