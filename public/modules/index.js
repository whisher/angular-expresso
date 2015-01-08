(function() {
'use strict';

angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});

function config($locationProvider, $urlRouterProvider, $logProvider, DEBUG) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');  
    $logProvider.debugEnabled(DEBUG);
}

function run($log, $rootScope, UserStorage) {
    $rootScope.$log = $log;
    $rootScope.global = {};
    $rootScope.global.user = UserStorage.get();
    $log.debug('App is running!');
}

angular.module('app', ['ngAnimate','core','auth','users','articles'])
	    .config(config)
	    .run(run);
 })();




