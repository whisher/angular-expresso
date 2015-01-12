(function() {
  'use strict';

function showVersion(VERSION) {
	return {
      		restrict: 'A',
      		link: function(scope, element) {
        			element.text('Version: ' + VERSION);
      		}
  	};
}
function userFeedback() {
	return {
    		require: 'ngModel',
    		restrict: 'A',
    		link: function(scope, element, attrs, ctrl) {
     			var $parentDiv = element.parent();
     			element.on('blur',function() {
    				var currentClass = $parentDiv.attr('class');
      	  			var currentsClass = currentClass.split(' ');
      	  			var len = currentsClass.length;
				if(len > 1){
					for (var i = 0; i < len; i++){
						$parentDiv.removeClass(currentsClass[i]);
					}		
				}
        				$parentDiv.addClass(currentsClass[0]);
	        			if(ctrl.$valid){
	          				$parentDiv.addClass('has-success');
	        			}
	        			else{
	          				$parentDiv.addClass('has-error');
	        			}
      			});
    		}
  	};
}
angular.module('core.directives', [])
    .directive('showVersion', showVersion)
    .directive('userFeedback', userFeedback);
})();

