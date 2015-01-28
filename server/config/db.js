'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

var mongoOptions = { db: { safe: true } };
// Connect to Database
module.exports = function(config) {
	var db = mongoose.connect(config.db, function(err) {
		if (err) {
			console.error('Could not connect to MongoDB!');
			console.log(err);
		}
	});
	return db;
};