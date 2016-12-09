//
// EXPRESS JS SERVER INITI
//
var express = require('express')
var app = express()

//
// MONGO DB INIT
//
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
app.get('/', function (req, res) {
    var url = 'mongodb://admin:detroit123@ds063946.mlab.com:63946/misale_dev';
    //
    // This function should be used for migrating a db table to a TBD format
    //
    var migrateMongoDBTable = function(db, callback) {
        // Get the documents collection
        console.log("Reading database records");
        // Get the documents collection
        var collection = db.collection('_dummy');
        // Find some documents
        //collection.find({'a': 3}).toArray(function(err, docs) {
        collection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);
          //console.log(docs);
          //console.log('docs.length ---> ', docs.length);
          console.log('Creating CSV...');
          //console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=');
          var json2csv = require('json2csv');
          var fields = ['_id', 'JobID', 'LastApplied'];
          var fieldNames = ['ID_OR_PK', 'JOB_UNIQUE_ID_TITLE', 'APPLICATION_DATE'];
          var data = json2csv({ data: docs, fields: fields, fieldNames: fieldNames });
          //console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=');
          // EXPORT FILE
          res.attachment('yourfilenamehere.csv');
          res.status(200).send(data);
          callback(docs);
        });
    };

    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      //
      // migrate db table to some format TBD
      //
      migrateMongoDBTable(db, function() {
        db.close();
      });
    });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
// Connection URL
//var url = 'mongodb://localhost:27017/myproject';