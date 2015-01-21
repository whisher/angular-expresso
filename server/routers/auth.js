'use strict';
var auth = require('../controllers/auth');
module.exports = function(app, configs, passport) {
	app.route('/auth/signin').post(auth.signin(configs, passport));
    	app.route('/auth/register').post(auth.userNameExists,auth.userEmailExists,auth.register(configs));
	app.route('/auth/logout').get(auth.logout);
 };



