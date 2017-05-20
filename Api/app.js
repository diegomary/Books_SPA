"use strict";
let express = require('express');
let app = express();
// This is cached so no need of it
//let jsonbooks = require(__dirname + '/static/books.json');
let path=require('path');
let booksFilePath = path.join(__dirname, '/static/books.json');
let fs = require('fs');

let MongoClient = require('mongodb');

let mongoUrl = 'mongodb://booksadmin:diegomary@ds061371.mongolab.com:61371/diegomary88';
//let mongoUrl = 'mongodb://diego:atreius@ec2-34-209-116-169.us-west-2.compute.amazonaws.com:27017/booksapi';
let assert = require('assert');

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method)  res.send(200);
    else next();
};

let bodyParser = require('body-parser');

app.use(allowCrossDomain); // This API will be fully accessible in yhe internet
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//http://booksapi-diegomary.rhcloud.com/?Firstame=David&Lastname=Burlando&email=david@dmm888.com&address=flat4%20455%20Fulham%20Road%20SW10%209UZ%20London%20Uk
app.get('/',  (req, res) => {
//  res.send( req.params ); to have the routing
  res.send( req.query ); // to have the querystring
});


app.get('/booksfromdb', function (req, res,next) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('Books').find({},{OLID:1,"data.title":1,"data.url":1,"data.cover":1,_id:0,"data.pagination":1,"data.authors":1,"data.price":1}).toArray(function (err, docs) { db.close(); res.send(docs);});
  });
});


app.get('/booksjson',  (req, res) => {
let readable = fs.createReadStream(booksFilePath);
readable.pipe(res);
//  res.send( req.params ); to have the routing
//  res.json(jsonbooks); // to have the querystring
//res.json(jsonbooks); // to have the querystring
});

app.get('/test/todo',  (req, res) => {
  res.send('This is a specific test!');
});

app.post('/api/users', (req, res) => {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
    console.log(user_id + ' ' + token +' ' +  geo);

    let obj = { id:user_id,token:token, geo:geo }
    res.send(obj);
});

app.listen(process.env.NODE_PORT || 3000, process.env.NODE_IP || 'localhost', () => {
  console.log(`Application worker ${process.pid} started...`);
});
