'use strict';

var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../../build'));
var server = app.listen('9001');

module.exports = gulp.task('e2e',['webdriver'] ,function (done) {
    gulp.src(config.paths.src.e2e, { read:false })
        .pipe(protractor({
            configFile: __dirname + '/../../protractor.conf.js',
            args: ['--baseUrl', 'http://' + server.address().address + ':' + server.address().port]
        }))
        .on('error', function(e) {
            server.close();
            done();
            throw e;
        })
        .on('end', function() {
            server.close();
            done();
        });
});