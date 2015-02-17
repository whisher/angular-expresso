'use strict';

var fs = require('fs'),
  _ = require('lodash');

// Set the node environment variable if not set before
var path = require('path');
var configPath = path.resolve(__dirname, '../../server/config/env');
 
process.env.NODE_ENV = ~fs.readdirSync(configPath).map(function(file) {
    return file.slice(0, -3);
  }).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

var releasePath = (process.env.NODE_ENV==='production')?'/dist':'/build';
// Extend the base configuration in all.js with environment
// specific configuration
 module.exports = _.extend(
   {releasePath:releasePath},
    require(configPath + '/all'),
    require(configPath + '/' + process.env.NODE_ENV) || {}
  );
