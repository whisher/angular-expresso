'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = gulp.task('watch', function () {
    watch(config.paths.src.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
        .pipe(connect.reload());
    watch(config.paths.src.templates, ['templates'])
        .pipe(connect.reload());
    watch(config.paths.src.index)
        .pipe(connect.reload());
});
