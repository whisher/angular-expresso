(function() {
'use strict';

function run($rootScope, jwtHelper, signinModal, HAS_MODAL_LOGIN, UserTokenStorage) {
  $rootScope.global  = {};
  $rootScope.global.isModalOpen  = false;

  $rootScope.$on('auth-show-modal', function(event, data) { 
    if(HAS_MODAL_LOGIN){
      $rootScope.global.isModalOpen  = true;
      signinModal.open();
    }
  });

  $rootScope.$on('isAuthenticated', function(event, data) { 
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
  };
  var token = UserTokenStorage.get();
  if(token){
    token = jwtHelper.decodeToken(token);
  }
  $rootScope.global.isAuthenticated =  token;
 
  $rootScope.global.logout = function() {
        UserTokenStorage.del();
  }; 

  $rootScope.global.isOwner = function(authorId) {
    if(!isAuthenticated){
      return false;
    }
    return isAuthenticated._id === authorId;
  }; 

}

angular.module('auth',[
  'ngStorage',
   'angular-jwt',
  'auth.services', 
  'auth.controllers', 
  'auth.routes'
  ])
  .run(run);
            
})();

