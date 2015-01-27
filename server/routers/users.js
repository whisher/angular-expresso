'use strict';
var users = require('../controllers/users');
module.exports = function(app, auth) {
	// Setting up the userId param
  	app.param('userId', users.user);
};



