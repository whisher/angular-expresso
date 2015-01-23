'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
      jwt = require('jsonwebtoken'),
	utils = require('../utils/errors');

function setJwtUser(user) {
  var isAdmin = user.role.indexOf('admin') !== -1;
  return {username:user.username,isAdmin:isAdmin,email:user.email,id:user._id};
}

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
      if (!user) {console.log(info);
        return res.status(403).json(utils.get500ErrorMessage(info));
      }
      req.login(user, function(err) {
	 if (err) {
	     return res.status(500).json(utils.get500ErrorMessage(err));
        }
        var token = jwt.sign(setJwtUser(user), configs.apiSecret, { expiresInMinutes: 60*5 });
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
        var token = jwt.sign(setJwtUser(user), configs.apiSecret, { expiresInMinutes: 60*5 });
        res.json({ token: token });
	});
    });
  };
};

exports.logout = function(req, res) {
	req.logout();
	// TODO no element found in the browser
      res.send(200);
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
