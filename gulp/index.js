'use strict';

/* global release:true */
/* exported release */

var fs = require('fs'),
  argv = require('yargs').argv,
  tasks = fs.readdirSync('./gulp/tasks/');

require('./config');

// --phonegap flag when executing a task
global.release = argv.release;

tasks.forEach(function (task) {
  require('./tasks/' + task);
});