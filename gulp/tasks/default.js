'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('default', function() {
    if (phonegap) {
        runSequence(
                'clean',
                ['templates', 'lint'],
                ['watch', 'connect']
                );
    } else {
        runSequence(
                'clean',
                ['index', 'styles', 'images', 'fonts', 'templates', 'lint'],
                'vendor','scripts',
                ['watch', 'serve']
                );
    }
}
);


