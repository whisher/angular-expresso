'use strict';

var gulp = require('gulp');




module.exports = gulp.task('watch', function () {
   
	var templatesWatcher = gulp.watch(config.paths.src.templates, ['templates','scripts','reload']);
	templatesWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks templates');
	});
 	var scriptsWatcher = gulp.watch(config.paths.src.scripts, ['lint','scripts','reload']);
	scriptsWatcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks scripts');
	});
});
