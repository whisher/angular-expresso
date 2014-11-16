(function() {
'use strict';

angular.element(document).ready(function() {
    angular.bootstrap(document, ['iwdif']);
});

function config($locationProvider, $urlRouterProvider, $logProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');  
    $logProvider.debugEnabled(true);
}

function run($log) {
    $log.debug('App is running!');
}

angular.module('iwdif', ['home'])
    .config(config)
    .run(run);
    
})();


