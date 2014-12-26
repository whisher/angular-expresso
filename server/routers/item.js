'use strict';

module.exports = function(app) {
	// Root routing
	var item = require('../controllers/item');
	app.route('/api/item').get(item.create);
};