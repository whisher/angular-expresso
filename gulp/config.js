global.SRC_FOLDER = 'src';
global.SCRIPTS_FOLDER = SRC_FOLDER + '/scripts';
global.BUILD_FOLDER = 'build';
global.PHONEGAP_FOLDER = 'phonegap/www';
global.TMP_FOLDER = 'tmp';

global.config = {
    paths: {
        src: {
            index: SRC_FOLDER + '/index.html',
            assets: [SRC_FOLDER + '/assets/**/*', '!' + SRC_FOLDER + '/assets/images/**/*'],
            images: SRC_FOLDER + '/assets/images/**/*',
            styles: SRC_FOLDER + '/styles/app.scss',
            stylesGlob: SRC_FOLDER + '/styles/**/*.scss',
            scripts: [
                TMP_FOLDER + '/templates/templates.js',
                SCRIPTS_FOLDER + '/home/**/*.js',
                SCRIPTS_FOLDER + '/index.js'
            ],
            vendor:[
                'bower_components/angular/angular.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js'
            ],
            templates: SRC_FOLDER + '/templates/**/*.html',
            templatesCompiled: TMP_FOLDER + '/templates'
        },
        dest: {
            build: {
                index: BUILD_FOLDER,
                styles: BUILD_FOLDER + '/styles',
                scripts: BUILD_FOLDER + '/scripts',
                images: BUILD_FOLDER + '/assets/images',
                assets: BUILD_FOLDER + '/assets',
            },
            phonegap: {
                index: PHONEGAP_FOLDER,
                styles: PHONEGAP_FOLDER + '/styles',
                scripts: PHONEGAP_FOLDER + '/scripts',
                images: BUILD_FOLDER + '/assets/images',
                assets: BUILD_FOLDER + '/assets',
            }
        }
    },
    filenames:{ 
        styles: 'bundle',
        scripts: 'bundle.js'
    },
    ports: {
        staticServer: 8888,
    }
};
