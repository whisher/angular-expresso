'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
module.exports = gulp.task('vendor', function () {
return gulp.src(config.paths.src.vendor)
    .pipe(concat(config.filenames.vendor))
    .pipe(gulpif(release,gulp.dest(config.paths.dest.dist.scripts),gulp.dest(config.paths.dest.build.scripts)));
});
