(function() {
'use strict';

function UserController() { 
	var user = this;
    	
}
function UserSigninController(Users) {
	var user = this;
	user.data = {};
    	user.signin = function() {
    		Users.signin(user.data).then(function(response) {
			console.log(response);
		})
		.catch(function(response) {
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
    .controller('UserSigninController', UserSigninController)
    .controller('UserSignupController', UserSignupController);
})();
