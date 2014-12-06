'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var baseDir =  release ? PHONEGAP_FOLDER + '/' : BUILD_FOLDER + '/';

module.exports = gulp.task('serve', function () {
	browserSync({
        server: {
            baseDir: "./" +baseDir
        }
    });
  
});