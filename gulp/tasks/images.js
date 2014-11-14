'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');

module.exports = gulp.task('images', function () {
  return gulp.src(config.paths.src.images)
    .pipe(gulpif(phonegap, imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulpif(phonegap, gulp.dest(config.paths.dest.phonegap.images), gulp.dest(config.paths.dest.build.images)));
});
