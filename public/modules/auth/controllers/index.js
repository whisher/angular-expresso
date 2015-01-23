(function() {
'use strict';

function SigninModalController($rootScope, $modalInstance,  Auth) {
    var auth = this;
    auth.data = {};
    auth.signin = function () {
        Auth.signin(auth.data)
            .then(function(response) {
                $modalInstance.close(response.data);
            })
            .catch(function(response) {alert(response.data);
                $rootScope.global.errors = response.data;
	});
    };
    auth.register = function () {
        Auth.register(auth.data)
            .then(function(response) {
                $modalInstance.close(response.data);
            })
            .catch(function(response) {
                $rootScope.global.errors = response.data;
            });
    };
    auth.forgot = function () {
        Auth.forgot(auth.data)
            .then(function(response) {
                $modalInstance.close(response.data);
            })
            .catch(function(response) {
                $rootScope.global.errors = response.data;
            });
    };

    auth.cancel = function () {
            $rootScope.global.isModalOpen  = false;
     	$modalInstance.dismiss('cancel');
    };
 }

angular.module('auth.controllers', [])
    .controller('SigninModalController', SigninModalController);
})();
