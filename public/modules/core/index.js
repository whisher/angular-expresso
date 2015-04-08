(function() {
'use strict';

function run($rootScope) {
    $rootScope.global  = {};
}

angular.module('core', [
      	'ui.router',
      	'templates',
	'core.services',
      	'core.directives',
      	'core.controllers',
     	'core.routes'
])
.run(run);

})();

