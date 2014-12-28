'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	utils = require('../utils/errors');

/**
 * Try to signin  an user
 */
exports.signin = function(passport) {
	return function(req, res,next) {
		req.checkBody('email', 'You must enter a valid email address').isEmail();
  		req.checkBody('password', 'Password must be between 8-20 characters long').len(8, 20);
  		var errors = req.validationErrors();
		if (errors) {
	    		return res.status(400).json(errors);
		}
        		passport.authenticate('local', function(err, user, info) {
            		if (err) {
                			return res.status(500).json(utils.get500ErrorMessage(err));
            		}
            		if (!user) {
                			return res.status(403).json(utils.get500ErrorMessage(info));
            		}
            		req.login(user, function(err) {
	                		if (err) {
	                    			return res.status(500).json(utils.get500ErrorMessage(err));
	                		}
	                		// Remove sensitive data before login
				user.password = undefined;
	                		res.json(user);
            		});
        		})
        		(req, res, next);
    	};
};
/**
 * Signup
 */
exports.signup = function(req, res,next) {
	var user = new User(req.body);
	req.checkBody('email', 'You must enter a valid email address').isEmail();
  	req.checkBody('password', 'Password must be between 8-20 characters long').len(8, 20);
  	var errors = req.validationErrors();
	if (errors) {
	    return res.status(400).json(errors);
	}
	user.save(function(err) {
		if (err) {console.log(err);
			return res.status(500).send(utils.get500ErrorMessage(err));
		} 
		// Remove sensitive data before login
		user.password = undefined;
		req.login(user, function(err) {
			if (err) {
				return res.status(500).json(utils.get500ErrorMessage(err));
			} 
			res.json(user);
		});
	});
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
exports.userExists = function(req, res, next) {
	User.count({
        		email: req.body.email
    	}, function (err, count) {
        		if (count === 0) {
            		return	next();
        		} 
           		res.status(400).json([{'param':'email','msg':'The email <'+req.body.email +'> is already registered'}]);
	});
}
exports.me = function(req, res) {
res.json({});
}
