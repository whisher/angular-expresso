(function() {
  'use strict';

function Articles($http) {
	return {
    		get: function() {
        			return $http.get('/api/articles');
    		},
    		add: function(data) {
        			return $http.post('/api/articles', data);
    		}
  	};
}

angular.module('articles.services', [])
    .factory('Articles', Articles);

})();