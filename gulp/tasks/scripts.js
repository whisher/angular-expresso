'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglifyjs');
var ngAnnotate = require('gulp-ng-annotate');
var uglifyOptions ={
      mangle: false,
      output: {
        beautify: !release
      },
      outSourceMap: !release
};

module.exports = gulp.task('scripts', function () {
return gulp.src(config.paths.src.scripts)
    .pipe(concat(config.filenames.scripts))
    .pipe(ngAnnotate())
    .pipe(uglify(config.filenames.scripts,uglifyOptions)) 
    .pipe(gulpif(release,gulp.dest(config.paths.dest.dist.scripts),gulp.dest(config.paths.dest.build.scripts)));
});