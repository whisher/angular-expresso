'use strict';

/**
 * Module dependencies.
 */
var _auth = require('../controllers/auth');
module.exports = function(app, auth, configs, passport) {
	app.route('/auth/signin').post(auth.isjustlogged, _auth.signin(configs, passport));
    	app.route('/auth/register').post(auth.isjustlogged, _auth.userNameExists, _auth.userEmailExists,_auth.register(configs));
	app.route('/auth/logout').get(auth.isnotlogged, _auth.logout);
	app.route('/auth/isjustlogged').get(_auth.isjustlogged);
};



