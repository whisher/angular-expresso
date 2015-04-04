'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

module.exports = gulp.task('styles', function() {
    return sass(config.paths.src.mainStyles, { sourcemap: true })
      .on('error', function (err) {
          console.error('Error', err.message);
    })
  .pipe(sourcemaps.write())
  .pipe(rename(config.filenames.styles))
  .pipe(gulpif(release, gulp.dest(config.paths.dest.dist.styles), gulp.dest(config.paths.dest.build.styles) ))
  .pipe(reload({stream:true}));
});