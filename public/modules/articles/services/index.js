(function() {
  'use strict';

function Articles($http) {
  return {
    get: function() {
      return $http.get('/api/articles');
    },
    getById: function(id) {
      return $http.get('/api/articles/' + id);
    },
    add: function(data) {
      return $http.post('/api/articles', data);
    },
    update: function(id, data) {
      return $http.put('/api/articles/' + id, data);
    },
    delete: function(id) {
      return $http.delete('/api/articles/' + id);
    }
  };
}

angular.module('articles.services', [])
    .factory('Articles', Articles);

})();