(function() {
  'use strict';

function showErrors($templateCache) {
  return {
    restrict: 'AE',
    scope:{
      errors: '='
    },
    template: $templateCache.get('users/templates/show-errors.html'),
    link: function(scope, elm, attrs) {
    }
  };
}


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
  .directive('showErrors', showErrors)
  .directive('passwordEquals', passwordEquals);
})();

