'use strict';

var gulp = require('gulp');

//https://github.com/gulpjs/gulp/issues/217
module.exports = gulp.task('watch', function() {
    
    var devFilesWatcher = gulp.watch(config.paths.src.dev, ['hint']);
    devFilesWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks dev');
    });
    
    var unitWatcher = gulp.watch(config.paths.src.unit, ['hint','unit']);
    unitWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks unit');
    });
    
    var indexWatcher = gulp.watch(config.paths.src.index, ['index']);
    indexWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks index');
    });
    
    var e2eWatcher = gulp.watch(config.paths.src.e2e, ['hint','e2e']);
    e2eWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks e2e');
    });
    
    var templatesWatcher = gulp.watch(config.paths.src.templates, ['templates', 'scripts']);
    templatesWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks templates');
    });
    
    var scriptsWatcher = gulp.watch(config.paths.src.scripts, ['hint', 'scripts']);
    scriptsWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks scripts');
    });
    
    var stylesWatcher = gulp.watch(config.paths.src.styles, ['styles']);
    stylesWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks styles');
    });
});
