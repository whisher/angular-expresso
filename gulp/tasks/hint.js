'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = gulp.task('hint', function () {
  return gulp.src(config.paths.src.jsGlobs)
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});
