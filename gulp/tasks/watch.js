'use strict';

var gulp = require('gulp');

module.exports = gulp.task('watch', function() {
	gulp.watch(config.paths.src.jsGlobs, ['hint']);
	gulp.watch(config.paths.src.styles, ['styles']);
	gulp.watch(config.paths.src.index, ['index']);
	gulp.watch(config.paths.src.templates, ['templates', 'scripts']);
            gulp.watch(config.paths.src.scripts, [ 'scripts']);
});
