'use strict';
/* global describe, beforeEach,  it, before,  after, afterEach, inject, expect, spyOn */

describe('Unit: UserRegisterController', function() {
    var $rootScope, $location, $httpBackend, $scope, $controller, Users;

    beforeEach(function() {
        module('ui.router');
        module('core.routes');
        module('users.services');
        module('users.controllers');
    });
    
    beforeEach(inject(function(_$rootScope_,_$controller_, _$location_, _$httpBackend_ ,  _Users_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = $rootScope.$new();
        Users = _Users_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $controller('UserRegisterController as user', { $rootScope : $rootScope , $scope: $scope,Users:Users});
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should register with correct data', function() {
        spyOn($rootScope, '$emit');
        $scope.user.data = {};
        $scope.user.data.username = 'myusertest';
        $scope.user.data.email = 'me@gmail.com';
        $scope.user.data.password = 'mypassword';
        $scope.user.save(); 
        var data = {token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im15dXNlcnRlc3QiLCJpc0FkbWluIjpmYWxzZSwiZW1haWwiOiJtZUBnbWFpbC5jb20iLCJpZCI6IjU0YzY1YjZlMGFkNTRmYjgxYTFlN2QyOSIsImlhdCI6MTQyMjI4NTY3OSwiZXhwIjoxNDIyMzAzNjc5fQ.HMUt7Vd7SoYe8ZkNq-I-WXf8GO8UJZQ6lzjW-XgU45I"};
        $httpBackend.expectPOST('/auth/register').respond(data);
        $httpBackend.expectGET('core/templates/index.html').respond(200);
        $httpBackend.flush();
        expect($rootScope.$emit).toHaveBeenCalledWith('auth-is-authenticated',data.token);
        expect($location.url()).toBe('/');
    });

});

describe('Unit: UserSigninController', function() {
    var $rootScope, $location, $httpBackend, $scope, $controller, Users;

    beforeEach(function() {
        module('ui.router');
        module('core.routes');
        module('users.services');
        module('users.controllers');
    });
    
    beforeEach(inject(function(_$rootScope_, _$location_, _$httpBackend_ ,_$controller_,  _Users_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = $rootScope.$new();
        Users = _Users_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $controller('UserSigninController as user', { $rootScope : $rootScope , $scope: $scope,Users:Users});
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should sign in with correct data', function() {
        spyOn($rootScope, '$emit');
        $scope.user.data = {};
        $scope.user.data.email = 'me@gmail.com';
        $scope.user.data.password = 'mypassword';
        $scope.user.save(); 
        var data = {token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im15dXNlcnRlc3QiLCJpc0FkbWluIjpmYWxzZSwiZW1haWwiOiJtZUBnbWFpbC5jb20iLCJpZCI6IjU0YzY1YjZlMGFkNTRmYjgxYTFlN2QyOSIsImlhdCI6MTQyMjI4NTY3OSwiZXhwIjoxNDIyMzAzNjc5fQ.HMUt7Vd7SoYe8ZkNq-I-WXf8GO8UJZQ6lzjW-XgU45I"};
        $httpBackend.expectPOST('/auth/signin').respond(data);
        $httpBackend.expectGET('core/templates/index.html').respond(200);
        $httpBackend.flush();
        expect($rootScope.$emit).toHaveBeenCalledWith('auth-is-authenticated',data.token);
        expect($location.url()).toBe('/');
    });

});