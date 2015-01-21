'use strict';
var expressJwt = require('express-jwt');
module.exports = function(configs) {
  return expressJwt({secret: configs.apiSecret})
};