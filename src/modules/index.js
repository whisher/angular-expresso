(function() {
'use strict';

angular.element(document).ready(function() {
    angular.bootstrap(document, ['iwdf']);
});

function config($locationProvider, $urlRouterProvider, $logProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/morra');  
    $logProvider.debugEnabled(true);
}

function run($log) {
    $log.debug('App is running!');
}

angular.module('iwdf', ['home','morra'])
    .config(config)
    .run(run);
    
})();




