(function() {
  'use strict';

function Users($http) {
  return {
    isjustlogged: function() {
        return $http.get('/auth/isjustlogged'); 
    },
    signin: function(data) {
        return $http.post('/auth/signin', data);
    },
    register: function(data) {
        return $http.post('/auth/register', data); 
    },
    logout: function() {
        return $http.get('/auth/logout'); 
    }
  };
}

angular.module('users.services', [])
    .factory('Users', Users);
})();