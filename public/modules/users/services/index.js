(function() {
  'use strict';

function Users($http) {
  return {
    signin: function(data) {
        return $http.post('/api/auth/signup', data);
    },
    signup: function(data) {
        return $http.post('/api/auth/signup', data) ; 
    }
  };
}

angular.module('users.services', [])
    .factory('Users', Users);

})();