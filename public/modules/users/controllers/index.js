(function() {
'use strict';

function UserController() {
	var user = this;
    	user.welcome = 'Welcomesyewffcc!';
}
function UserSigninController($http) {
	var user = this;
    	user.signin = function() {
    		ser.errors = [];
		$http.post('/api/auth/signin', user)
			.then(function(response) {
					console.log(response);
					
			})
			.catch(function(response) {
				console.log(response.data);
				user.errors = response.data;
			});
	};
}
function UserSignupController($http) {
	var user = this;
    	user.signup = function() {
	    	user.errors = [];
		$http.post('/api/auth/signup', user)
			.then(function(response) {
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
