(function() {
  'use strict';

function passwordEquals() {
  return {
        require : 'ngModel',
        link : function(scope, element, attrs, ngModel) {
            scope.$watch(attrs.passwordEquals, function() {
                ngModel.$validate();
            });
            ngModel.$validators.isEquals = function(value) {
                var password = scope.$eval(attrs.passwordEquals);
                if(!password || !value){
                    return false;
                }
                return (value === password);
            };
        } 
    };
}
angular.module('users.directives', [])
  .directive('passwordEquals', passwordEquals);
})();

