'use strict';

/* global describe, beforeEach,  it, before,  after, afterEach, inject, expect */

describe('Unit: CoreController', function() {
    var $rootScope, $scope, $controller;

    beforeEach(module('core.controllers'));

    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $controller('CoreController as core', { $scope: $scope});
    }));

    it('should have welcome.', function() {
        expect($scope.core.welcome).toEqual('Welcome!');
    });

    it('should have prologue.', function() {
        expect($scope.core.prologue).toEqual('Angular express just an other mean stack');
    });
    
});

