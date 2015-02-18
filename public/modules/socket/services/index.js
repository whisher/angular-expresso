(function() {
  'use strict';

function Socket(socketFactory) {
	var socket;
	return {
		set:function(token){console.log('token',token);
			var ioSocket = io.connect('?token=' + token);
			socket = socketFactory({
		    		ioSocket: ioSocket
		  	});
		},
		get:function(){
			return socket;
		}
	};
}

angular.module('socket.services', [])
	.factory('Socket', Socket);
})();