(function() {
  'use strict';

function showArticles(VERSION) {
  return {
      restrict: 'A',
      link: function(scope, element) {
        element.text('Version: ' + VERSION);
      }
  };
}

angular.module('articles.directives', [])
    .directive('showArticles', showArticles);
})();