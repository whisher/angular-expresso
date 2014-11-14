'use strict';

app.config(function($stateProvider) {
    $stateProvider      
        .state('home', {
            url: '/',
            templateUrl: 'templates/home/index.html',
            controller:'HomeController'
    });
});