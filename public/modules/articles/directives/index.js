(function() {
'use strict';

function modalArticleDestroy($rootScope, $modal, $templateCache, Articles) {
  return {
    scope:{
      article: '='
    },
    restrict: 'A',
    link: function(scope, element) {
      element.on('click',function() {
        var modalInstance = $modal.open({
      template:  $templateCache.get('articles/templates/modalDestroy.html'),
      controller: 'ArticleDestroyController',
      controllerAs: 'article',
      size: 'sm',
      resolve: {
        articleData: function(){
          return scope.article;
        }
    }
    });
    modalInstance.result.then(function (article) {
      Articles.destroy(article._id).then(function(response) {
        $rootScope.$emit('article-has-been-deleted', article._id);
      })
      .catch(function(response) {
        console.log(response);
      });
     
    });
      });//click
    }
  };
}


angular.module('articles.directives', [])
  
    .directive('modalArticleDestroy', modalArticleDestroy);
    
})();

