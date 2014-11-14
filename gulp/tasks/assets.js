'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');

module.exports = gulp.task('assets', function () {
  return gulp.src(config.paths.src.assets)
    .pipe(gulpif(phonegap, gulp.dest(config.paths.dest.phonegap.assets), gulp.dest(config.paths.dest.build.assets)));
});
