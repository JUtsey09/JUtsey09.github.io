var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var ejs = require('ejs');
var ObjectId = require('mongodb').ObjectID;
var db = mongoose.connection;



app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));
app.set('view engine', 'html');

//Database Connection

mongoose.connect('mongodb://jutsey09:q1w2e3r4@ds027425.mlab.com:27425/myproject', function(err) {
  if (err) {
    console.log('Failed connecting to MongoDB!');
  } else {
    console.log('Successfully connected to MongoDB!');
  }
});

//Create Schema
var Schema = new mongoose.Schema({
  name: String,
	comment: String
});

//Create and export model
var comment = mongoose.model('comment', Schema);

module.exports = comment;


//**----------Routes---------------**//
//Get Data
app.get('/comment', function(req,res){
  console.log("Get request successful!");
  //Get data from MongoDB and pass it to the view
  db.collection('comment').find({}).toArray(function(err, data){
    console.log("Get Data: ",data);
    res.json(data);
  });
});
//Post Data
app.post('/comment', function(req, res){
  //Get data from view and pass to MongoDB
  db.collection('comment').insert(req.body, function(err,data){
    console.log("Post Data: ", req.body);
    res.json(data);
  });
});
//Delete by ID
app.delete('/comment/:id', function (req, res){
  //Delete Id from MongoDB
  var id = req.params.id;
  console.log("Data to be deleted: ", id);
  db.collection('comment').deleteOne({"_id": mongoose.Types.ObjectId(id)}, function (err, data){
    res.json(data);
  });
});
//Port Listen
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
