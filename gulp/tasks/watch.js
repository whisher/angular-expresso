'use strict';

var gulp = require('gulp');




module.exports = gulp.task('watch', function () {
   
	var templatesWatcher = gulp.watch(config.paths.src.templates, ['templates','scripts']);
	templatesWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks templates');
	});
 	var scriptsWatcher = gulp.watch(config.paths.src.scripts, ['lint','scripts']);
	scriptsWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks scripts');
	});
        var stylesWatcher = gulp.watch(config.paths.src.styles, ['styles']);
	stylesWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks styles');
	});
});
