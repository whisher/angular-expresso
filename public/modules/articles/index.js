(function() {
'use strict';
function run(Socket, $state) {
	Socket.on('connect', function(){
       		console.log('Connect');
  	});
  	Socket.on('error', function(error) {
  		console.log('Socket io error :', error.type);
	    	if (error.type === 'UnauthorizedError' || error.code === 'invalid_token') {
	      		return $state.go('home');
	    	}
  	});
 }
angular.module('articles', [
      'ui.router',
      'ui.bootstrap',
      'templates',
      'socket',
      'articles.services',
      'articles.filter',
      'articles.directives',
      'articles.controllers',
      'articles.routes'
])
	.run(run);

})();

