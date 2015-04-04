'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var BROWSER_SYNC_RELOAD_DELAY = 3000;

module.exports = gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
            // nodemon our expressjs server
            script: 'server.js',
            // watch core server file(s) that require server restart on change
            watch: ['server.js'],
            port:3000
    })
    .on('start', function onStart() {
        //ensure start only got called once
       if (!called) {console.log('start'); cb();  browserSync.reload({
                stream: false //
            });
   }
        called = true;
    })
    .on('change', function(){
console.log('change');
    })
    .on('restart', function onRestart() {console.log('restart');
        // reload connected browsers after a slight delay
        setTimeout(function reload() {
            console.log('restart');
            browserSync.reload({
                stream: false //
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    });
});
