'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test';
});

gulp.task('env:develop', function () {
  process.env.NODE_ENV = 'development';
});

gulp.task('env:production', function () {
  process.env.NODE_ENV = 'production';
});
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
                ['index', 'styles', 'fonts', 'templates', 'hint'],
                ['vendor','scripts'],
                'watch'
       );
    }
}
);


