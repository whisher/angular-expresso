(function() {
'use strict';

function CoreController() {
	var core = this;
    	core.welcome = 'Welcome!';
    	core.prologue = 'Angular express just an other mean stack';
}
function NavController($rootScope, UserStorage){
	var nav = this;
	nav.isAuthenticated = UserStorage.get();
	$rootScope.$on('isAuthenticated', function(event, data) { 
        		nav.isAuthenticated = UserStorage.get();
      	});
	nav.logout = function() {
     		UserStorage.del();
    	}; 
}
angular.module('core.controllers', [])
    .controller('CoreController', CoreController)
    .controller('NavController', NavController);
})();
