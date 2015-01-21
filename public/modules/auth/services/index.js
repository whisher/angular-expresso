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
function UserTokenStorage($sessionStorage) {
  return {
    set: function(token) {
        $sessionStorage.token = token;
    },
    get: function() {
        return $sessionStorage.token; 
    },
    del: function() {
        $sessionStorage.$reset();
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
 
function HttpInterceptor($rootScope, $q, UserTokenStorage) {
    return {
        'request': function(config) {
            var token = UserTokenStorage.get();
            config.requestTimestamp = new Date().getTime();
            config.headers = config.headers || {};
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        'response': function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        },
        'responseError': function(rejection) {
            if (rejection.status === 401) {
                $rootScope.$emit('auth-show-modal', rejection);
            }
            return $q.reject(rejection);
        }
    };
}

angular.module('auth.services', [])
    .factory('Auth', Auth)
    .factory('UserTokenStorage', UserTokenStorage)
    .factory('HttpInterceptor', HttpInterceptor)
    .factory('signinModal', signinModal);
})();