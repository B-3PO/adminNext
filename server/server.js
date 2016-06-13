var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var app = express();
var port = 4000;
var ipaddress = '0.0.0.0';
var authSecret = 'shhhhhhh-secret-123';


var generalSearch = require('./modules/generalSearch');
var dataManager = require('../devModules/expressJam');
var organizations = require('./modules/organizations')(app, dataManager);
var venues = require('./modules/venues')(app, dataManager);
var locations = require('./modules/locations')(app, dataManager);



dataManager.addDatabase({
  host: '127.0.0.1',
  user: 'tester',
  password: 'testTester',
  database: 'newAdminExamles',
  connectionLimit: 10,
  default: true
});



var server = http.createServer(app);
server.listen(port, ipaddress, function (){
  console.log('Server Listening on port: 4000');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', expressJwt({ secret: authSecret}));
app.use(function (err, req, res, next){
  if(err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});



var authorizeRoute = require('./modules/auth')(authSecret);
app.use('/auth', authorizeRoute);

organizations.initRoutes();
venues.initRoutes();
locations.initRoutes();


app.post('/api/search', function(req, res) {
  generalSearch.get(req.user, req.body.term, function (error, data) {
    if (error !== undefined) {
      res.end();
      return;
    }

    res.send(data);
  });
});
