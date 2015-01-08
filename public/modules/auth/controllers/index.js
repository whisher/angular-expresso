(function() {
'use strict';

function LoginModalController($modalInstance,Auth) {
    var auth = this;
    auth.showSigninFields = true;
    auth.showSignupFields = false;
    auth.showForgotFields = false;
    auth.login = function () {
        Auth.login(auth.data)
            .then(function(response) {
                $modalInstance.close(response.data);
            })
            .catch(function(response) {
                auth.errors = response.data;
	});
    };

    auth.cancel = function () {
     	$modalInstance.dismiss('cancel');
    };
 }

angular.module('auth.controllers', [])
    .controller('LoginModalController', LoginModalController);
})();
