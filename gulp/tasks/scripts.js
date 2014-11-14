'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

module.exports = gulp.task('scripts', function () {
return gulp.src(config.paths.src.vendor.concat(config.paths.src.scripts))
    .pipe(concat(config.filenames.scripts))
    .pipe(ngAnnotate())
    .pipe(gulpif(phonegap,uglify()))
    .pipe(gulpif(phonegap,gulp.dest(config.paths.dest.phonegap.scripts),gulp.dest(config.paths.dest.build.scripts)))
    .pipe(reload({stream:true}));
});
