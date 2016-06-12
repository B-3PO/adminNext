var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dataManager = require('../devModules/expressJam');

var app = express();
var port = 4000;
var ipaddress = '0.0.0.0';



// dataManager.addDatabase({
//   host: '127.0.0.1',
//   user: 'tester',
//   password: 'testTester',
//   database: 'newAdminExamles',
//   connectionLimit: 10,
//   default: true
// });



var server = http.createServer(app);
server.listen(port, ipaddress, function (){
  console.log('Server Listening on port: 4000');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));