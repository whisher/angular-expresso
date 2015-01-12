(function() {
'use strict';

function UserController() { 
	var user = this;
    	
}
function UserLoginController($rootScope,$state, Users, UserStorage) {
	var user = this;
	user.data = {};
    	user.save = function() {
    		Users.login(user.data).then(function(response) {
			console.log(response.data);
			UserStorage.set(response.data);
			$rootScope.$emit('isAuthenticated', response.data);
			$state.go('home');
		})
		.catch(function(response) {
			console.log(response);
			user.errors = response.data;
		});
	};
}
function UserSignupController($state, Users) {
	var user = this;
	user.data = {};
	user.errors  = [];
	user.save = function(isValid) {
		Users.signup(user.data).then(function(response) {
			console.log(response);
			$state.go('home');
		})
		.catch(function(response) {
			console.log(response);
			user.errors = response.data;
		});
	};
}
angular.module('users.controllers', [])
    .controller('UserController', UserController)
    .controller('UserLoginController', UserLoginController)
    .controller('UserSignupController', UserSignupController);
})();
