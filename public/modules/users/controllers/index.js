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
function UserSignupController(Users) {
	var user = this;
	user.data = {};
	user.errors  = [];
    	user.signup = function() {
	    	Users.signup(user.data).then(function(response) {
			console.log(response);
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
