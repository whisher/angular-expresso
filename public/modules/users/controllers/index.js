(function() {
'use strict';

function UserController() { 
	var user = this;
}

function UserSigninController($rootScope, $state, Users) {
	var user = this;
	user.data = {};
    	user.save = function() {
    		Users.signin(user.data).then(function(response) {
			$rootScope.$emit('auth-is-authenticated', response.data.token);
			$state.go('home');
		})
		.catch(function(response) {
			user.errors = response.data;
		});
	};
}

function UserRegisterController($rootScope, $state, Users) {
	var user = this;
	user.data = {};
	user.errors  = [];
	user.save = function() {
		Users.register(user.data).then(function(response) {
			$rootScope.$emit('auth-is-authenticated', response.data.token);
			$state.go('home');
		})
		.catch(function(response) {
			user.errors = response.data;
		});
	};
}
angular.module('users.controllers', [])
    .controller('UserController', UserController)
    .controller('UserSigninController', UserSigninController)
    .controller('UserRegisterController', UserRegisterController);
})();
