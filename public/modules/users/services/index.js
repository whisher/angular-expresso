(function() {
  'use strict';

function Users($http) {
  return {
    login: function(data) {
        return $http.post('/api/auth/login', data);
    },
    signup: function(data) {
        return $http.post('/api/auth/signup', data) ; 
    },
    logout: function(data) {
        return $http.get('/api/auth/logout') ; 
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
angular.module('users.services', [])
    .factory('Users', Users)
    .factory('UserStorage', UserStorage);
})();