(function() {
'use strict';

function config($stateProvider,$httpProvider) {
    $stateProvider      
        .state('auth', {
            abstract: true,
        	template: '<ui-view/>',
        	resolve:{
            	auth : function(Auth){
            		return Auth.isLoggedIn();
            	}
            }

    });
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('HttpInterceptor');
}

angular.module('auth.routes', [])
    .config(config);
    
})();