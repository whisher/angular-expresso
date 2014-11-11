'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');

module.exports = gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: config.ports.staticServer,
    livereload: true
  });
});