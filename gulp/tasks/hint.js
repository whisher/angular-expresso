'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = gulp.task('hint', function () {
  return gulp.src(config.paths.src.scripts.concat(config.paths.src.dev,config.paths.src.unit,config.paths.src.e2e))
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});
