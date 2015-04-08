(function() {
'use strict';

function run($window, $rootScope, $state, jwtHelper, signinModal, HAS_MODAL_LOGIN, UserTokenStorage, Auth) {
  
  $rootScope.global.isModalOpen  = false;
  $rootScope.global.errors = [];

  var token = UserTokenStorage.get();
  if(token){ 
    var bool = jwtHelper.isTokenExpired(token);
    if(bool){
      token = undefined;
      logout();
    }
    else{
      token = jwtHelper.decodeToken(token);
    }
  }
  $rootScope.global.isAuthenticated =  token;

  $rootScope.$on('auth-unauthorized', function(event, data) { 
    logout();
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
 
  

  $rootScope.global.isOwner = function(authorId) {
    if(!$rootScope.global.isAuthenticated){
      return false;
    }
    if($rootScope.global.isAuthenticated.hasAdminRole){
      return true;
    }
    return  $rootScope.global.isAuthenticated.id === authorId;
  }; 
  

  $rootScope.global.logout = function() {
    logout();
  }; 

  function logout(){
     Auth.logout().then(function(response) {
      UserTokenStorage.del();
      $rootScope.$broadcast('logout', $rootScope.global.isAuthenticated);
      delete $rootScope.global.isAuthenticated;
      $state.go('home',{}, {reload: true});     
    })
    .catch(function(response) {
      throw new Error('Sorry, something went so wrong');
    }); 
  }   
}

angular.module('auth',[
  'ui.bootstrap',
  'ngStorage',
  'angular-jwt',
  'auth.services', 
  'auth.controllers', 
  'auth.routes',
  'socket'
  ])
  .run(run);
            
})();

