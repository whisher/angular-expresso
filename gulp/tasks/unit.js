'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var karma = require('karma').server;

module.exports = gulp.task('unit', function (done) {
    karma.start({ 
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    }, done);
});
