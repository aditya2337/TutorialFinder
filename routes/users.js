var express = require('express');
var router = express.Router();
var mongo = require('../model/db');

/* GET users listing. */
router.get('/', function (req, res, next) {
  mongo.db.collection('tutorialFinderUsers').find().toArray((err, users) => {
    if (err) res.sendStatus(400);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json({title: 'All Users',
      users});
  });
});

module.exports = router;
