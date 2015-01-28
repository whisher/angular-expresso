(function() {
'use strict';

function config($stateProvider) {
	$stateProvider      
        		.state('home', {
            		url: '/',
            		templateUrl: 'core/templates/index.html',
            		controller:'CoreController as core'
    		})
        		.state('404', {
            		url: '/404',
            		templateUrl: 'core/templates/404.html'
    		})
        		.state('500', {
            		url: '/500',
            		templateUrl: 'core/templates/500.html'
    		});
}

angular.module('core.routes', [])
    .config(config);
})();
