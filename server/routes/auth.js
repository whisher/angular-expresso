'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	auth = require('../middlewares/auth'),
	_auth = require('../controllers/auth');
module.exports = function(app) {
	app.route('/auth/signin').post(auth.isjustlogged, _auth.signin(app,passport));
    	app.route('/auth/register').post(auth.isjustlogged, _auth.userNameExists, _auth.userEmailExists,_auth.register(app));
	app.route('/auth/logout').get(auth.isnotlogged, _auth.logout);
	app.route('/auth/isjustlogged').get(_auth.isjustlogged);
};



