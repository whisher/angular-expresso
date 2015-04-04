(function() {
'use strict';

angular.element(document).ready(function() {
    angular.bootstrap(document, ['app'],{strictDi:true});
});

function config($locationProvider, $urlRouterProvider, $logProvider, $httpProvider, DEBUG) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');  
    $logProvider.debugEnabled(DEBUG);
    $httpProvider.useApplyAsync(true);
}

function run($log) {
    $log.debug('App is running!');
}

angular.module('app', ['ngAnimate','core','auth','users','articles'])
	    .config(config)
	    .run(run);
 })();




