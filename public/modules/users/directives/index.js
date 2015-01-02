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

  angular.module('users.directives', [])
    .directive('showErrors', showErrors);
})();