'use strict';

/* global app:true */
/* exported app */


var app = angular.module('home', ['ui.router']);

app.config(function($locationProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
});

app.run(function ($rootScope) {
       
});
