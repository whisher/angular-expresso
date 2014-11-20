'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('default', function() {
    if (phonegap) {
        runSequence(
                'clean',
                ['index', 'styles', 'images', 'fonts', 'templates', 'hint'],
                'vendor','scripts',
                ['serve']
                );
    } else {
        runSequence(
                'clean',
                ['index', 'styles', 'images', 'fonts', 'templates', 'hint'],
                'vendor','scripts',
                ['watch', 'serve']
                );
    }
}
);


