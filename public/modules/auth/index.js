(function() {
'use strict';

function run($rootScope,loginModal,HAS_MODAL_LOGIN) {
	$rootScope.$on('no-auth', function(event, data) { 
        		if(HAS_MODAL_LOGIN){
          			loginModal.open();
        		}
      	});
}

angular.module('auth',['auth.services','auth.controllers','auth.routes'])
    .run(run);
            
})();

