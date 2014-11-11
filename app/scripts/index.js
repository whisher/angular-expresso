'use strict';

/* global app:true */
/* exported app */

angular.element(document).ready(function() {
    angular.bootstrap(document, ['iwdif'])
});


var app = angular.module('iwdif', ['ui.router']);

app.config(function($locationProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
});

app.run(function ($rootScope) {
       
});
