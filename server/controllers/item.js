'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Item = mongoose.model('Item');
	
/**
 * Create a article
 */
exports.create = function(req, res) {
	var item= new Item(req.body);
	item.save(function(err) {
		if (err) {
			 return res.json(500, err.message);
		} 
		res.json(item);
	});
};
