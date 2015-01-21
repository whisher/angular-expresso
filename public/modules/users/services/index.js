(function() {
  'use strict';

function Users($http) {
  return {
    signin: function(data) {
        return $http.post('/auth/signin', data);
    },
    register: function(data) {
        return $http.post('/auth/register', data); 
    },
    logout: function(data) {
        return $http.get('/auth/logout'); 
    }
  };
}

angular.module('users.services', [])
    .factory('Users', Users);
})();