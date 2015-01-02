(function() {
  'use strict';

function Articles($http) {
  return {
    get: function() {
        return $http.get('/api/articles');
    }
  };
}

angular.module('articles.services', [])
    .factory('Articles', Articles);

})();