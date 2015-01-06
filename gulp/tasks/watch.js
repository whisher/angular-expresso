'use strict';

var gulp = require('gulp');
var server = require('gulp-express');

//https://github.com/gulpjs/gulp/issues/217
module.exports = gulp.task('watch', function() {
    server.run({
        file: 'server.js'
    });

    var devFilesWatcher = gulp.watch(config.paths.src.jsGlobs, ['hint']);
    devFilesWatcher.on('change', server.notify);
    
    var unitWatcher = gulp.watch(config.paths.src.unit, ['unit']);
    unitWatcher.on('change', server.notify);
    
    var indexWatcher = gulp.watch(config.paths.src.index, ['index']);
    indexWatcher.on('change',server.notify);
    
    var e2eWatcher = gulp.watch(config.paths.src.e2e, ['e2e']);
    e2eWatcher.on('change', server.notify);
    
    var templatesWatcher = gulp.watch(config.paths.src.templates, ['templates', 'scripts']);
    var scriptsWatcher = gulp.watch(config.paths.src.scripts, [ 'scripts']);
    var scriptsBundle = config.paths.dest.build.scripts+'/'+config.filenames.scripts;
    gulp.watch(scriptsBundle, server.notify);
  
    var stylesWatcher = gulp.watch(config.paths.src.styles, ['styles']);
    var cssBundle = config.paths.dest.build.styles+'/'+config.filenames.styles;
    gulp.watch(cssBundle, server.notify);

});
