(function() {
  'use strict';

function Users($http) {
  return {
    signin: function(data) {
        return $http.post('/api/auth/signin', data);
    },
    register: function(data) {
        return $http.post('/api/auth/register', data) ; 
    },
    logout: function(data) {
        return $http.get('/api/auth/logout') ; 
    }
  };
}

angular.module('users.services', [])
    .factory('Users', Users);
})();