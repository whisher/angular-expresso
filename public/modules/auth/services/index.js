(function() {
  'use strict';

function Auth($http) {
  return {
    isLoggedIn: function() {
        return $http.get('/api/auth/isloggedin');
    },
    login: function(data) {
        return $http.post('/api/auth/signin', data);
    }
  };
}
function loginModal($modal, $rootScope,$templateCache) {
    function successCallback (data) {
        console.log('success',data);
    }
    function errorCallback (data) {
        console.log('fail',data);
    }
    return {
        open : function(){
            var modalInstance =  $modal.open({
                template: $templateCache.get('auth/templates/modal-login.html'),
                controller: 'LoginModalController',
                controllerAs: 'auth'
            });
            return modalInstance.result.then(successCallback).catch(errorCallback);
        }
    };
}
 
function HttpInterceptor($rootScope,$q) {
    var canceller = $q.defer();
    return {
        'request': function(config) {
            config.requestTimestamp = new Date().getTime();
            config.timeout = canceller.promise;
            return config;
        },
        'response': function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        },
        'responseError': function(rejection) {
            if (rejection.status === 401) {
                $rootScope.$emit('no-auth', rejection);
                canceller.resolve('Unauthorized');
            }
            return $q.reject(rejection);
        }
    };
}

angular.module('auth.services', [])
    .factory('Auth', Auth)
    .factory('HttpInterceptor', HttpInterceptor)
    .factory('loginModal', loginModal);
})();