'use strict';

var gulp = require('gulp');
var server = require('gulp-express');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var livereload = require('gulp-livereload');
require('./gulp/config');

gulp.task('scripts', function () {
	return gulp.src(config.paths.src.scripts)
	    .pipe(concat(config.filenames.scripts))
	    .pipe(ngAnnotate())
	    .pipe(gulp.dest(config.paths.dest.build.scripts))
	    .pipe(livereload());
});
gulp.task('serve', function () {
    // Start the server at the beginning of the task
    server.run({
        file: 'server.js',
        port: 45729
    });
    livereload.listen();
    gulp.watch(config.paths.src.scripts, ['scripts', server.notify]);
});
gulp.task('default', ['serve']); //