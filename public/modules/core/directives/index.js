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

angular.module('core.directives', [])
    .directive('showVersion', showVersion);
})();