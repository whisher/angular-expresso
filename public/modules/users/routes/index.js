(function() {
'use strict';

function config($stateProvider,$httpProvider) {
    $stateProvider      
       .state('session', {
                abstract: true,
                templateUrl: 'users/templates/session.html',
                /*resolve: {
                    issessionedin: function(Sessions){
                        return Sessions.isSessionedIn();
                    } 
                }*/
            })
            .state('session.signin', {
                url: '/user/signin',
                templateUrl: 'users/templates/signin.html',
                controllerAs: 'user',
                controller:'UserSigninController'
             })
            .state('session.signup', {
                url: '/user/signup',
                templateUrl: 'users/templates/signup.html',
                controllerAs: 'user',
                controller:'UserSignupController'
             });
       
}

angular.module('users.routes', [])
    .config(config);
})();
