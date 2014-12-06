'use strict';

/* global config:true */
/* exported config */

global.SRC_FOLDER = 'src';
global.SCRIPTS_FOLDER = SRC_FOLDER + '/modules';
global.BUILD_FOLDER = 'build';
global.PHONEGAP_FOLDER = 'phonegap/www';
global.TMP_FOLDER = 'tmp';

global.config = {
    paths: {
        src: {
            index: SRC_FOLDER + '/index.html',
            styles: SRC_FOLDER + '/styles/app.scss',
            scripts: [
                TMP_FOLDER + '/templates/templates.js',
                SRC_FOLDER + '/modules/**/*.js'
            ],
            vendor:[
                'bower_components/ionic/release/js/ionic.min.js',
                'bower_components/angular/angular.min.js',
                'bower_components/angular-animate/angular-animate.min.js',
                'bower_components/angular-sanitize/angular-sanitize.min.js',
                'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                'bower_components/ionic/release/js/ionic-angular.min.js',
            ],
            fonts: [
                'bower_components/ionic/release/fonts/**'
            ],
            images: SRC_FOLDER + '/images/**/*',
            templates: SRC_FOLDER + '/templates/**/*.html',
            templatesCompiled: TMP_FOLDER + '/templates',
            dev: [
                'karma.conf.js',
                'protractor.conf.js',
                'gulp/**/*.js'
            ],
            unit : [SRC_FOLDER + '/tests/unit/**/*.js'],
            e2e : [SRC_FOLDER + '/tests/e2e/**/*.js']
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
                index: PHONEGAP_FOLDER,
                styles: PHONEGAP_FOLDER + '/styles',
                scripts: PHONEGAP_FOLDER + '/scripts',
                fonts: PHONEGAP_FOLDER + '/fonts',
                images: PHONEGAP_FOLDER + '/images'
            }
        }
    },
    filenames:{ 
        styles: 'bundle.css',
        vendor: 'vendor.js',
        scripts: 'scripts.js'
    }
};
