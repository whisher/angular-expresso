'use strict';

/* global describe, beforeEach,  it, before,  after, afterEach, inject, expect */

describe('Unit: ArticlesController', function() {
    var $rootScope, $scope, $controller;

    beforeEach(function() {
        module('articles.controllers');
    });
    
    beforeEach(inject(function(_$rootScope_,_$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        var articlesData = [{title:'my title',content:'my content'}];
        $controller('ArticlesController as articles', {$scope: $scope,articlesData:articlesData});
    }));

   
    it('articles.data should create an array with at least one article object ', function() {
         expect($scope.articles.data.length).toBe(1);
    });

});

