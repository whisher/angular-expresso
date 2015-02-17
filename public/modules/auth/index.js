(function() {
'use strict';

function run($window, $rootScope, $state, jwtHelper, signinModal, HAS_MODAL_LOGIN, UserTokenStorage, Auth) {
  $rootScope.global  = {};
  $rootScope.global.isModalOpen  = false;
  $rootScope.global.errors = [];

  $window.onbeforeunload = function(e){
    /*Auth.logout().then(function(response) {
      UserTokenStorage.del();
    })
    .catch(function(response) {
    });*/
  };
  $rootScope.$on('auth-unauthorized', function(event, data) { 
    UserTokenStorage.del();
    if(HAS_MODAL_LOGIN){
      $rootScope.global.isModalOpen  = true;
      signinModal.open();
    }
  });

  $rootScope.$on('auth-forbidden', function(event, data) { 
    UserTokenStorage.del();
  });

  $rootScope.$on('auth-is-authenticated', function(event, data) { 
    UserTokenStorage.set(data);
    $rootScope.global.isAuthenticated =  jwtHelper.decodeToken(UserTokenStorage.get());
  });

  $rootScope.global.current = {};
  $rootScope.global.current.signin = true;
  $rootScope.global.current.register = false;
  $rootScope.global.current.forgot = false;
  $rootScope.global.show = function (current) {
    if(!$rootScope.global.isModalOpen){
       $rootScope.global.isModalOpen  = true;
       signinModal.open();
    }
    angular.forEach($rootScope.global.current, function(value, key) {
      $rootScope.global.current[key]  = false;
    });
    $rootScope.global.current[current]  = true;
    $rootScope.global.errors.length = 0;
  };

  var token = UserTokenStorage.get();
  if(token){
    token = jwtHelper.decodeToken(token);
  }
  $rootScope.global.isAuthenticated =  token;
 
  $rootScope.global.logout = function() {
    Auth.logout().then(function(response) {
      UserTokenStorage.del();
      delete $rootScope.global.isAuthenticated;
      $state.go('home');     
    })
    .catch(function(response) {
      throw new Error('Sorry, something went so wrong');
    });
        
  }; 

  $rootScope.global.isOwner = function(authorId) {
    if(!$rootScope.global.isAuthenticated){
      return false;
    }
    if($rootScope.global.isAuthenticated.hasAdminRole){
      return true;
    }
    return  $rootScope.global.isAuthenticated.id === authorId;
  }; 
  $rootScope.global.signin = function() {
    if(HAS_MODAL_LOGIN){
      $rootScope.global.show('signin');
      return;
    }
    $state.go('session.signin');  
  }; 
  $rootScope.global.register = function() {
    if(HAS_MODAL_LOGIN){
      $rootScope.global.show('register');
      return;
    }
    $state.go('session.register');  
  }; 
}

angular.module('auth',[
  'ui.bootstrap',
  'ngStorage',
  'angular-jwt',
  'auth.services', 
  'auth.controllers', 
  'auth.routes'
  ])
  .run(run);
            
})();

