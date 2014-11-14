'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');

module.exports = gulp.task('connect', function () {
  connect.server({
    root: phonegap ? PHONEGAP_FOLDER + '/' : BUILD_FOLDER + '/',
    port: config.ports.staticServer,
    livereload: true
  });
});