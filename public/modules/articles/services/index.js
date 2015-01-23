(function() {
  'use strict';

function Articles($http) {
  return {
    get: function() {
      return $http.get('/api/articles');
    },
    show: function(id) {
      return $http.get('/api/articles/' + id);
    },
    create: function(data) {
      return $http.post('/api/articles', data);
    },
    update: function(id, data) {
      return $http.put('/api/articles/' + id, data);
    },
    destroy: function(id) {
      return $http.delete('/api/articles/' + id);
    }
  };
}

angular.module('articles.services', [])
    .factory('Articles', Articles);

})();