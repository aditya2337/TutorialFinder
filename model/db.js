const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://admin1:admin1@ds053206.mlab.com:53206/androiditya', (err, conn) => {
  if (err) console.log(err);
  module.exports.db = conn;
});
