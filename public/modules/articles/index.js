(function() {
'use strict';
function run() {
	
 }
angular.module('articles', [
      'ui.router',
      'ui.bootstrap',
      'templates',
      'articles.services',
      'articles.filter',
      'articles.directives',
      'articles.controllers',
      'articles.routes'
])
	.run(run);

})();

