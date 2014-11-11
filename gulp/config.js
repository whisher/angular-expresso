global.SRC_FOLDER = 'app';
global.BUILD_FOLDER = 'build';
global.TMP_FOLDER = 'tmp';

global.config = {
    paths: {
        src: {
            index: SRC_FOLDER + '/index.html',
            styles: SRC_FOLDER + '/styles/main.css',
            scripts: SRC_FOLDER + '/scripts/**/*.js',
            templates: SRC_FOLDER + '/templates/**/*.html',
            templatesCompiled: SRC_FOLDER + '/scripts/templates',
        },
        dest: {
            build: {
                index: BUILD_FOLDER,
                styles: BUILD_FOLDER,
                scripts: BUILD_FOLDER,
            }
        },
        exclude:{
            bower: '!' + SRC_FOLDER + '/bower_components/**'
        }
    },
    filenames: {
    },
    ports: {
        staticServer: 8888,
    }
};
