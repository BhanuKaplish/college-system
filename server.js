/*
File Name:          server.js
Author Name:        Albert Monteiro, Bhanu Kaplish, Manuel Castro
Website Name:       College-system
File Description:   This is a server file which listens to the port
*/

process.env.NODE_ENV = process.env.NODE_ENV ||  'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'), 
    passport = require('./config/passport');

var db = mongoose();
var app = express(); 
var passport = passport();

app.listen(3000);

module.exports = app;

console.log("Server running at port localhost:3000");