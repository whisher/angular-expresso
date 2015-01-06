'use strict';

/* global config:true */
/* exported config */

global.SRC_FOLDER = 'public';
global.SCRIPTS_FOLDER = SRC_FOLDER + '/modules';
global.BUILD_FOLDER = 'build';
global.RELEASE_FOLDER = 'dist';
global.TMP_FOLDER = 'tmp';

var config = {
    paths: {
        src: {
            index: SRC_FOLDER + '/index.html',
            mainStyles: SRC_FOLDER + '/styles/app.scss',
            styles: SRC_FOLDER + '/styles/*.scss',
            scripts: [
                TMP_FOLDER + '/templates/templates.js',
                SRC_FOLDER + '/modules/**/*.js'
            ],
            vendor:[
                'bower_components/angular/angular.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/angular-animate/angular-animate.js'
            ],
            fonts: [
                'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**',
                'bower_components/fontawesome/fonts/**'
            ],
            images: SRC_FOLDER + '/images/**/*',
            templates: SRC_FOLDER + '/modules/**/templates/*.html',
            templatesCompiled: TMP_FOLDER + '/templates',
            dev: [
                './karma.conf.js',
                './protractor.conf.js',
                './gulpfile.js',
                './gulp/**/*.js'
            ],
            unit : [SRC_FOLDER + '/tests/unit/**/*.js'],
            e2e : [SRC_FOLDER + '/tests/e2e/**/*.js'],
            server: ['./server.js', './server/**/*.js']
        },
        dest: {
            build: {
                index: BUILD_FOLDER,
                styles: BUILD_FOLDER + '/styles',
                scripts: BUILD_FOLDER + '/scripts',
                fonts: BUILD_FOLDER + '/fonts',
                images: BUILD_FOLDER + '/images',
                
            },
            phonegap: {
                index: RELEASE_FOLDER,
                styles: RELEASE_FOLDER + '/styles',
                scripts: RELEASE_FOLDER + '/scripts',
                fonts: RELEASE_FOLDER + '/fonts',
                images: RELEASE_FOLDER + '/images'
            }
        }
    },
    filenames:{ 
        styles: 'bundle.css',
        vendor: 'vendor.js',
        scripts: 'scripts.js'
    }
};

config.paths.src.jsGlobs = config.paths.src.scripts.concat(
    config.paths.src.dev,
    config.paths.src.unit,
    config.paths.src.e2e,
    config.paths.src.server);

global.config = config;