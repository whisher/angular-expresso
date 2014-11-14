'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');

module.exports = gulp.task('reload', function () {
  	var url = phonegap ? PHONEGAP_FOLDER + '/' : BUILD_FOLDER + '/';
	return gulp.src(url).pipe(connect.reload());
});

