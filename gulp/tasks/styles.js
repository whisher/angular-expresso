//'use strict'; It's uncommented beacuse of this.emit('end');

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');

function handleError(err) {
  console.log(err.toString());
  this.emit('end'); 
}

var sassOptions = { // The options to be passed to sass()
    style: 'expanded', 
    'sourcemap=none': true 
};

//https://github.com/jgoux/generator-angulpify/issues/19
module.exports = gulp.task('styles', function () {
  return gulp.src(config.paths.src.mainStyles)
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulpif(release, csso()))
    .pipe(gulpif(release, sass(sassOptions).on('error', handleError), sass(sassOptions).on('error', handleError)))
    .pipe(rename(config.filenames.styles))
    .pipe(gulpif(release, gulp.dest(config.paths.dest.phonegap.styles), gulp.dest(config.paths.dest.build.styles) ))
    .pipe(reload({stream:true}));
});
