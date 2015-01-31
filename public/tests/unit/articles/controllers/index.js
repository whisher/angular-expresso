'use strict';

/* global describe, beforeEach,  it, before,  after, afterEach, inject, expect, spyOn */

describe('Unit: ArticlesController', function() {
    var $rootScope, $scope, $controller;

    beforeEach(function() {
        module('articles');
    });
    var fakeModal = {
        result: {
            then: function(confirmCallback, cancelCallback) {
                //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                this.confirmCallBack = confirmCallback;
                this.cancelCallback = cancelCallback;
            }
        },
        close: function( item ) {
            //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
            this.result.confirmCallBack( item );
        },
        dismiss: function( type ) {
            //The user clicked cancel on the modal dialog, call the stored cancel callback
            this.result.cancelCallback( type );
        },
        open:function(){}
    }; 

    beforeEach(inject(function($modal) {
        spyOn($modal, 'open').and.callFake(fakeModal);
    })); 

    beforeEach(inject(function(_$rootScope_,_$controller_, $modal){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        var articlesData = {data:[{title:'my title',content:'my content'}]};
        $controller('ArticlesController as articles', {$scope: $scope, $modal: $modal, articlesData:articlesData});
    }));

   
    it('articles.data should create an array with at least one article object ', function() {
         expect($scope.articles.data.length).toBe(1);
         //$scope.articles.open($scope.articles.data[0]);
    });

});

describe('Unit: ArticleShowController', function() {
    var $rootScope, $scope, $controller, articleData;

    beforeEach(function() {
        module('articles');
    });
    
    beforeEach(inject(function(_$rootScope_,_$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        articleData = {data:{title:'my title',content:'my content'}};
        $controller('ArticleShowController as article', {$scope: $scope, articleData:articleData});
    }));

    it('article.data should be an object ', function() {
         expect($scope.article.data.title).toEqual(articleData.data.title);
         expect($scope.article.data.content).toEqual(articleData.data.content);
    });

});

describe('Unit: ArticleCreateController', function() {
    var $rootScope, $location, $httpBackend, $scope, $controller, Articles;


    beforeEach(function() {
        module('articles');
    });
    
    beforeEach(inject(function(_$rootScope_,_$controller_, _$location_, _$httpBackend_ ,  _Articles_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        Articles = _Articles_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $controller('ArticleCreateController as article', {$scope: $scope,Articles:Articles});
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create an article with correct data', function() {
        $scope.article.data = {};
        $scope.article.data.title = 'my title';
        $scope.article.data.content = 'my content';
        $scope.article.save(); 
        var data = {"__v":0,"user":"54bf722d28154200181b772b","title":"my title","content":"my content","_id":"54cb92c48ad09f971354f21c","created":"2015-01-30T14:18:44.576Z"};
        $httpBackend.expectPOST('/api/articles').respond(data);
        $httpBackend.expectGET('/api/articles').respond(200);
        $httpBackend.flush();
        expect($location.url()).toBe('/articles');
    });

});

describe('Unit: ArticleUpdateController', function() {
    var $rootScope, $location, $httpBackend, $scope, $controller, Articles;
    var articleData = {data: {"__v":0,"user":"54bf722d28154200181b772b","title":"my title","content":"my content","_id":"54cb92c48ad09f971354f21c","created":"2015-01-30T14:18:44.576Z"}};

    beforeEach(function() {
        module('articles');
    });
    
    beforeEach(inject(function(_$rootScope_,_$controller_ , _$httpBackend_,  _$location_, _Articles_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        Articles = _Articles_;
        $controller('ArticleUpdateController as article', {$scope: $scope,articleData:articleData,$stateParams:{id:articleData.data._id},Articles:Articles});
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create an article with correct data', function() {
        expect($scope.article.data.title).toEqual(articleData.data.title);
        expect($scope.article.data.content).toEqual(articleData.data.content);
        $scope.article.data.title = "my title update";
        $scope.article.data.content = "my content update";
        $scope.article.save(); 
        var data = {"__v":0,"user":"54bf722d28154200181b772b","title":"my title update","content":"my content update","_id":"54cb92c48ad09f971354f21c","created":"2015-01-30T14:18:44.576Z"};
        $httpBackend.expectPUT('/api/articles/'+articleData.data._id).respond(data);
        $httpBackend.expectGET('/api/articles').respond(200);
        $httpBackend.flush();
        expect($location.url()).toBe('/articles');
    });

});



