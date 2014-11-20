'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var minifyHTML = require('gulp-minify-html');

module.exports = gulp.task('index', function () {
    console.log(config.filenames.scripts);
  return gulp.src(config.paths.src.index)
    .pipe(gulpif(phonegap, minifyHTML({comments: true, empty: true, spare: true, quotes: true})))
    .pipe(
      replace('<!--styles-->', '<link rel="stylesheet" href="styles/' + config.filenames.styles + '">')
    )
    .pipe(gulpif(phonegap,
      replace('<!--cordova-->', '<script type="text/javascript" src="cordova.js"></script>'),
      replace('<!--cordova-->', '')
    ))
    .pipe(
      replace('<!--vendor-->', '<script src="scripts/' + config.filenames.vendor + '"></script>')
    )
    .pipe(
      replace('<!--scripts-->', '<script src="scripts/' + config.filenames.scripts + '"></script>')
    )
    .pipe(gulpif(phonegap,
      gulp.dest(config.paths.dest.phonegap.index),
      gulp.dest(config.paths.dest.build.index)));
    });
