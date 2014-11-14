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
                ['index', 'styles', 'images', 'assets', 'templates', 'lint'],
                'scripts',
                ['watch', 'connect']
                );
    }
}
);


