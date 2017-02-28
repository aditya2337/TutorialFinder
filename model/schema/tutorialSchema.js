const mongoose = require('mongoose');
require('../db');

const TutorialSchema = new mongoose.Schema({
  image: String,
  title: String,
  tutorialLink: String,
  type: [String],
  liveDemoLink: String,
  githubLink: String,
  userId: String
},
{ collection: 'tutorialFinderTutorials' }
);

module.exports = mongoose.model('Tutorial', TutorialSchema);
