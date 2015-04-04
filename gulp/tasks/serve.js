'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

var BROWSER_SYNC_RELOAD_DELAY = 3000;
gulp.task('nodemon', function (cb) {
var called = false;
return nodemon({
// nodemon our expressjs server
script: 'server.js',
// watch core server file(s) that require server restart on change
watch: ['server.js']
})
.on('start', function onStart() {
// ensure start only got called once
if (!called) { cb(); }
called = true;
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

module.exports = gulp.task('serve',['nodemon'],  function () {
	browserSync({
        		proxy: 'http://localhost:3000',
                         port:3001,
                         browser: ['firefox']
    	});
  
});