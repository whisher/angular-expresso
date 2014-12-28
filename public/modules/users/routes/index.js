(function() {
'use strict';

function config($stateProvider,$httpProvider) {
    $stateProvider      
       .state('session', {
                abstract: true,
                templateUrl: 'templates/users/session.html',
                /*resolve: {
                    issessionedin: function(Sessions){
                        return Sessions.isSessionedIn();
                    } 
                }*/
            })
            .state('session.signin', {
                url: '/user/signin',
                templateUrl: 'templates/users/signin.html',
                controllerAs: 'user',
                controller:'UserSigninController'
             })
            .state('session.signup', {
                url: '/user/signup',
                templateUrl: 'templates/users/signup.html',
                controllerAs: 'user',
                controller:'UserSignupController'
             });
       
}

angular.module('users.routes', [])
    .config(config);
})();
