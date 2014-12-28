'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var baseDir =  release ? RELEASE_FOLDER + '/' : BUILD_FOLDER + '/';

module.exports = gulp.task('browser', function () {
	browserSync({
        proxy: 'http://localhost:3000'
    });
});