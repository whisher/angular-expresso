'use strict';

/**
 * Module dependencies.
 */
var expressJwt = require('express-jwt');
module.exports = function(configs) {
  return expressJwt({secret: configs.apiSecret});
};