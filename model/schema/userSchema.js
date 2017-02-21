const mongoose = require('mongoose');
require('../db');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  fname: String,
  lname: String,
  password: String
},
{ collection: 'tutorialFinderUsers' }
);

module.exports = mongoose.model('User', UserSchema);
