var express = require('express');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');

var router = express.Router();
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'tester',
  password: 'testTester',
  database: 'newAdminExamles'
});

var secret;


router.post('/login', function(req, res) {
  findUser(req.body.email, req.body.password, function (error, user) {
    if (error !== undefined) {
      res.status(error.status).send(error.message);
      return;
    }

    var token = generateToken(user);
    res.send({token: token});
  });
});



function findUser(email, password, callback) {
  var query = 'select users.first,users.last,userscope.admin,userscope.organization_id,userscope.venue_id from users';
  query += ' left join userscope on userscope.user_id = users.id';
  query += ' where email=\'' + email + '\' and password=\'' + password + '\'';

  connection.query(query, function(error, rows, fields) {
    if (error || rows[0] === undefined) {
      callback({
        status: 401,
        message: 'Could not find user'
      });
      return;
    }

    var user = {
      first: rows[0].first,
      last: rows[0].last,
      admin: rows[0].admin === 1,
      organization_id: rows[0].organization_id,
      venue_id: rows[0].venue_id
    };
    callback(undefined, user);
  });
}



// use info from user doc to generate a access token
function generateToken(user) {
  return jwt.sign(user, secret);
}



// contructor function to set token secrets
module.exports = function(_secret) {
	secret = _secret;

	return router;
};
