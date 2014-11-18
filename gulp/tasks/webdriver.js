'use strict';

var gulp = require('gulp');
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

//update webdriver if necessary, this task will be used by e2e task
module.exports = gulp.task('webdriver', webdriverUpdate);
