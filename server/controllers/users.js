'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	User = mongoose.model('User');
	
/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
  User
    .findOne({
      _id: id
    })
    .exec(function(err, user) {
      if (err){
        return next(err);
      } 
      if (!user){
        return next(new Error('Failed to load User ' + id));
      } 
      req.profile = user;
      next();
    });
};

exports.me = function(req, res) {
	res.json(req.profile);
};
