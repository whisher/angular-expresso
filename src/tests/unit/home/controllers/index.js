'use strict';
/* global describe, beforeEach,  it, before,  after, afterEach, inject, expect */

describe('Home Controller Test', function() {
    var $rootScope, $scope, $controller, home;
    beforeEach(module('home.controllers'));
    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $controller('HomeController as home', { $scope: $scope});
    }));
    it('should have welcome.', function() {
        expect($scope.home.welcome).toEqual('Welcome!');
    });
});

