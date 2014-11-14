'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var filter      = require('gulp-filter');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


module.exports = gulp.task('styles', function () {
  return gulp.src(config.paths.src.styles)
    .pipe(gulpif(phonegap, sass().on('error', handleError), sass().on('error', handleError)))
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulpif(phonegap, csso()))
    .pipe(rename({basename: config.filenames.styles}))//https://github.com/sindresorhus/gulp-ruby-sass/issues/113#issuecomment-53157670
    .pipe(gulpif(phonegap, gulp.dest(config.paths.dest.phonegap.styles), gulp.dest(config.paths.dest.build.styles) ))
    .pipe(filter('**/*.css')) // Filtering stream to only css files
    .pipe(gulpif(!phonegap,reload({stream:true})));
});
