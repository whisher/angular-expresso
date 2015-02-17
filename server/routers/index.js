'use strict';

/**
 * Module dependencies.
 */
var index = require('../controllers/index');
module.exports = function(app) {
	app.route('/partials/:name').get(index.partials());
   };



