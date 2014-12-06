'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var del = require('del');

module.exports = gulp.task('clean', function (cb) {
    del(release ? [TMP_FOLDER, RELEASE_FOLDER] : [TMP_FOLDER, BUILD_FOLDER], cb);
});
