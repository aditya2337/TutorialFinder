const mongoose = require('mongoose');
require('../db');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  fname: String,
  lname: String,
  password: String,
  oauth_provider: String,
  oauth_id: String
},
{ collection: 'tutorialFinderUsers' }
);

module.exports = mongoose.model('User', UserSchema);
