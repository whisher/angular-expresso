(function() {
  'use strict';

function SocketArticles(socketFactory, UserTokenStorage) {
	var socket;
	return{
		get:function(){
			var ioSocket = io.connect(':3000/articles?token=' + UserTokenStorage.get());
			var socket = socketFactory({
    				ioSocket: ioSocket
  			});
			return socket;	
		}	
	};
	
}
angular.module('socket.services', [])
   .factory('SocketArticles', SocketArticles);
})();