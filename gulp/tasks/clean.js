'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var del = require('del');

module.exports = gulp.task('clean', function (cb) {
    if (release) {
        del([
            BUILD_FOLDER,
            TMP_FOLDER
        ], cb);
    }
    else {
        del([
            BUILD_FOLDER,
            TMP_FOLDER
        ], cb);
    }
});
