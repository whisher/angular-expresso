'use strict';

/* global release:true */
/* exported release */

var fs = require('fs'),
  argv = require('yargs').argv,
  tasks = fs.readdirSync('./gulp/tasks/');

// --release flag for prodution 
global.release = argv.release;

require('./config');

tasks.forEach(function (task) {
  require('./tasks/' + task);
});