'use strict';

/* global phonegap:true */
/* exported phonegap */

var fs = require('fs'),
  argv = require('yargs').argv,
  tasks = fs.readdirSync('./gulp/tasks/');

require('./config');

// --phonegap flag when executing a task
global.phonegap = argv.phonegap;

tasks.forEach(function (task) {
  require('./tasks/' + task);
});