'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('heroku', function() {
    runSequence( 
                'clean',
                ['index', 'styles',  'fonts', 'templates', 'hint'],
                'vendor','scripts'
    );
});


