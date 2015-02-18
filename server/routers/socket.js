'use strict';


module.exports = function(io){
	return function (socket) {
		console.log('a user connected');
		socket.on('article add', function(data){
			console.log(data);
		});
	};
};



