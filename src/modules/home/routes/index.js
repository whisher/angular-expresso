(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('home', {
            url: '/',
            templateUrl: 'templates/home/index.html',
            controller:'HomeController as home'
    });
}

angular.module('home.routes', [])
    .config(config);
})();
