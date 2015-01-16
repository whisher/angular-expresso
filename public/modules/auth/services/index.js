(function() {
  'use strict';

function Auth($http) {
  return {
    isLoggedIn: function() {
        return $http.get('/api/auth/isloggedin');
    },
    signin: function(data) {
        return $http.post('/api/auth/signin', data);
    },
    register: function(data) {
        return $http.post('/api/auth/register', data);
    },
    forgot: function(data) {
        return $http.post('/api/auth/forgot', data);
    }
  };
}
function UserStorage($sessionStorage) {
  return {
    set: function(data) {
        $sessionStorage.user = angular.toJson(data);
    },
    get: function() {
        return angular.fromJson($sessionStorage.user); 
    },
    del: function() {
        delete $sessionStorage.user;
    }
  };
}
function signinModal($modal, $templateCache) {
    function successCallback (data) {
        console.log('success',data);
    }
    function errorCallback (data) {
        console.log('fail',data);
    }
    return {
        open : function(){
            var modalInstance =  $modal.open({
                template: $templateCache.get('auth/templates/modal.html'),
                controller: 'SigninModalController',
                controllerAs: 'auth',
                size:'lg'
            });
            return modalInstance.result.then(successCallback).catch(errorCallback);
        }
    };
}
 
function HttpInterceptor($rootScope, $q) {
    return {
        'request': function(config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        'response': function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        },
        'responseError': function(rejection) {
            if (rejection.status === 401) {
                $rootScope.$emit('auth-show-modal', 'signin');
            }
            return $q.reject(rejection);
        }
    };
}

angular.module('auth.services', [])
    .factory('Auth', Auth)
    .factory('UserStorage', UserStorage)
    .factory('HttpInterceptor', HttpInterceptor)
    .factory('signinModal', signinModal);
})();