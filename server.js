"use strict"
var express = require('express');
var app = express();
var path = require('path');

// MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES
app.use(express.static('public'))//defining folder for static files ect

app.get('*', function(req,res){ //catch the main route and send back as a responce: index.html
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, function() {
  console.log('Web-server');
})
