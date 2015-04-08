'use strict';

/**
 * Module dependencies.
 */
var expressJwt = require('express-jwt');
module.exports = function(app) {
  return expressJwt({secret: app.locals.apiSecret, expiresInMinutes: app.locals.tokenExpiresInMinutes});
};