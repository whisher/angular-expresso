'use strict';
var users = require('../controllers/users');
module.exports = function(app, auth) {
	app.route('/api/users/me').get(auth.requiresLogin,users.me);
   	// Setting up the userId param
  	app.param('userId', users.user);
};



