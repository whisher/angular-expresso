'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var BROWSER_SYNC_RELOAD_DELAY = 500;
var baseDir =  release ? RELEASE_FOLDER + '/' : BUILD_FOLDER + '/';

module.exports = gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({script: './server/server.js'})
	.on('start', function () {
		 // ensure start only got called once
		if (!called) {
			called = true;
			cb();
		}
	})
	 .on('restart', function onRestart() {
		// reload connected browsers after a slight delay
		setTimeout(function reload() {
		browserSync.reload({
			stream: false //
		});
		}, BROWSER_SYNC_RELOAD_DELAY);
	});
});