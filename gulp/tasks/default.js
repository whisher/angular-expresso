'use strict';

var gulp = require('gulp');
module.exports = gulp.task('default',
    ['templates', 'lint', 'connect', 'watch']
);


