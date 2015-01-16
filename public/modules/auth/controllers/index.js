(function() {
'use strict';

function SigninModalController($modalInstance, currentShowForm, Auth) {
    var auth = this;
    auth.current = {};
    auth.current.signin = true;
    auth.current.register = false;
    auth.current.forgot = false;
    auth.show = function (current) {
        angular.forEach(auth.current, function(value, key) {
           auth.current[key]  = false;
        });
        auth.current[current]  = true;
    };
    auth.data = {};
    auth.signin = function () {
        Auth.signin(auth.data)
            .then(function(response) {
                $modalInstance.close(response.data);
            })
            .catch(function(response) {
                auth.errors = response.data;
	});
    };
    auth.register = function () {
        Auth.register(auth.data)
            .then(function(response) {
                $modalInstance.close(response.data);
            })
            .catch(function(response) {
                auth.errors = response.data;
            });
    };
    auth.forgot = function () {
        Auth.forgot(auth.data)
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
    .controller('SigninModalController', SigninModalController);
})();
