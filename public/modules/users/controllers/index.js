(function() {
'use strict';

function UserController() { 
	var user = this;
}
function UserSigninController($rootScope, $state, Users, UserTokenStorage) {
	var user = this;
	user.data = {};
    	user.save = function() {
    		Users.signin(user.data).then(function(response) {
			console.log(response.data.token);
			UserTokenStorage.set(response.data.token);
			$rootScope.$emit('isAuthenticated', response.data.token);
			$state.go('home');
		})
		.catch(function(response) {
			UserTokenStorage.del();
			console.log(response);
			user.errors = response.data;
		});
	};
}
function UserRegisterController($rootScope, $state, Users, UserTokenStorage) {
	var user = this;
	user.data = {};
	user.errors  = [];
	user.save = function(isValid) {
		Users.register(user.data).then(function(response) {
			console.log(response.data.token);
			UserTokenStorage.set(response.data.token);
			$rootScope.$emit('isAuthenticated', response.data.token);
			$state.go('home');
		})
		.catch(function(response) {
			console.log(response);
			UserTokenStorage.del();
			user.errors = response.data;
		});
	};
}
angular.module('users.controllers', [])
    .controller('UserController', UserController)
    .controller('UserSigninController', UserSigninController)
    .controller('UserRegisterController', UserRegisterController);
})();
