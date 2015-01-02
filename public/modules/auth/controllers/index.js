(function() {
'use strict';

function LoginModalController($modalInstance,Auth) {
    var auth = this;
    auth.login = function () {
        Auth.signin(auth.data)
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
