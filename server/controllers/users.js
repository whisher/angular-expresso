'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	utils = require('../utils/errors');
/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
  User
    .findOne({
      _id: id
    })
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
};
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
		if (req.body.remember) {
          	 req.session.cookie.maxAge = 1000 * 60 * 3;
        	}
        	else {
          	 req.session.cookie.expires = false;
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
 * Register
 */
exports.register = function(req, res, next) {

	req.checkBody('username', 'username must be between 3-10 characters long').len(3, 10);
	req.checkBody('email', 'You must enter a valid email address').isEmail();
  	req.checkBody('password', 'Password must be between 8-20 characters long').len(8, 20);
  	req.checkBody('password_confirmation', 'Passwords do not match').equals(req.body.password);
  	var errors = req.validationErrors();
	if (errors) {
	    return res.status(400).json(errors);
	}

	var user = new User(req.body);
	user.save(function(err) {
		if (err) {console.log(err);
			return res.status(500).json(utils.get500ErrorMessage(err));
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
exports.userEmailExists = function(req, res, next) {
	User.count({
        		email: req.body.email
    	}, function (err, count) {
        		if (count === 0) {
            		return	next();
        		} 
           		res.status(400).json([{'param':'email','msg':'The email <'+req.body.email +'> is already registered'}]);
	});
};
exports.userNameExists = function(req, res, next) {
	User.count({
        		username: req.body.username
    	}, function (err, count) {
        		if (count === 0) {
            		return	next();
        		} 
           		res.status(400).json([{'param':'username','msg':'The username <'+req.body.username +'> is already registered'}]);
	});
};
exports.me = function(req, res) {
	res.json({});
};
