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
function moveCursorToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}
angular.module('articles.directives', [])
    .directive('showArticles', showArticles);
})();
