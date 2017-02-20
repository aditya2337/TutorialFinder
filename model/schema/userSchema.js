const mongoose = require('mongoose');
require('../db');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String
});

module.exports = mongoose.model('User', UserSchema);
