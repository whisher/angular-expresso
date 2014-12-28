'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var BROWSER_SYNC_RELOAD_DELAY = 500;


module.exports = gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({
		script: 'server.js',
    		ext: 'html js',
    		env: { 'NODE_ENV': 'development' } ,
    		ignore: ['./node_modules/**'],
    		nodeArgs: ['--debug']
    	})
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