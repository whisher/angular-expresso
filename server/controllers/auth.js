'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
      jwt = require('jsonwebtoken'),
	utils = require('../utils/errors');

/**
 * just logged route
 */
exports.isjustlogged = function(req, res) {
  if (req.isAuthenticated()) {
    return res.sendStatus(403);
  }
  return res.sendStatus(200);
};

/**
 * Try to signin  an user
 */
exports.signin = function(configs, passport) {
  return function(req, res,next) {
    req.checkBody('email', 'You must enter a valid email address').isEmail();
    req.checkBody('password', 'Password must be between 8-20 characters long').len(8, 20);
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).json(errors);
    }
    if (req.body.remember) {
          	 req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
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
        var userData =  {username:user.username,isAdmin:user.isAdmin(),email:user.email,id:user._id};
        var token = jwt.sign(userData, configs.apiSecret, { expiresInMinutes: configs.expiresInMinutes });
        res.json({ token: token });
        
      });
    })(req, res, next);
  };
};
/**
 * Register
 */
exports.register  = function(configs) {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return req.sendStatus(403);
    }
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
      if (err) {
	 return res.status(500).json(utils.get500ErrorMessage(err));
	} 
	req.login(user, function(err) {
        if (err) {
	   return res.status(500).json(utils.get500ErrorMessage(err));
        } 
        var userData =  {username:user.username,isAdmin:false,email:user.email,id:user._id};
        var token = jwt.sign(userData, configs.apiSecret, { expiresInMinutes: configs.expiresInMinutes });
        res.json({ token: token });
	});
    });
  };
};

exports.logout = function(req, res) {
	req.logout();
	// TODO no element found in the browser
      res.sendStatus(200);
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
