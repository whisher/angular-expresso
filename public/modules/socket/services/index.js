(function() {
  'use strict';

function Socket(socketFactory, UserTokenStorage) {
	var ioSocket = io.connect('?token=' + UserTokenStorage.get());
	var socket = socketFactory({
    		ioSocket: ioSocket
  	});
	return socket;
}

angular.module('socket.services', [])
	.factory('Socket', Socket);
})();