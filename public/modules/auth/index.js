(function() {
'use strict';

function run($rootScope, signinModal, HAS_MODAL_LOGIN, UserStorage) {
  $rootScope.$on('auth-show-modal', function(event, data) { 
    if(HAS_MODAL_LOGIN){
      signinModal.open();
    }
  });
  var isAuthenticated = UserStorage.get();
  $rootScope.isAuthenticated = isAuthenticated;
  $rootScope.$on('isAuthenticated', function(event, data) { 
    		$rootScope.isAuthenticated = UserStorage.get();
  });
  $rootScope.logout = function() {
        UserStorage.del();
  }; 
  $rootScope.isOwner = function(authorId) {
    if(!isAuthenticated){
      return false;
    }
    return isAuthenticated._id === authorId;
  }; 
}

angular.module('auth',
	['ngStorage',
	'auth.services', 
	'auth.controllers', 
	'auth.routes'])
    .run(run);
            
})();

