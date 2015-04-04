'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('default', function() {
    if (release) { 
        runSequence(
                'clean',
                ['index', 'styles',  'fonts', 'templates', 'hint'],
                'vendor','scripts',
                ['serve']
                );
    } else {
        runSequence(
               'clean',
                ['index', 'styles', 'fonts', 'assets', 'templates', 'hint'],
                ['vendor','scripts'],
                ['serve'],
                ['watch']
       );
    }
}
);


