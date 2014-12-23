'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.sendFile(path.resolve('../build/index.html'));
};