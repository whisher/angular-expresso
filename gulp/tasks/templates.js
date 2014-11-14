'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var gulpif = require('gulp-if');
var templateCache = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');


module.exports = gulp.task('templates', function () {
  return gulp.src(config.paths.src.templates)
    .pipe(gulpif(phonegap, minifyHTML({empty: true, spare: true, quotes: true})))
    .pipe(templateCache({ standalone: true,root:'templates' }))
    .pipe(gulp.dest(config.paths.src.templatesCompiled))
    .pipe(reload({stream:true}));
});
