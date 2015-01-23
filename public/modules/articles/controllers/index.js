(function() {
'use strict';

function ArticlesController($templateCache, $modal, articlesData, Articles, $state) {
  var articles = this;
  articles.data = articlesData.data;
  articles.open = function (article) {
    var modalInstance = $modal.open({
      template:  $templateCache.get('articles/templates/modalDestroy.html'),
      controller: 'ArticleDestroyController',
      controllerAs: 'article',
      size: 'sm',
      resolve: {
        articleData: function(){
          return article;
        }
  	}
    });
    modalInstance.result.then(function (article) {
      Articles.destroy(article._id).then(function(response) {
        var data = [];
        angular.forEach(articles.data, function(value, key) {
          if( value._id !== article._id){
            this.push(value);
          }
        }, data);
        articles.data = data;
      })
      .catch(function(response) {
        console.log(response);
      });
     
    });
  };
}
function ArticleCreateController($state, Articles) {
      var article = this;
      article.title = 'Add';
    	article.data = {};
    	article.save = function() {
    		Articles.create(article.data).then(function(response) {
		      $state.go('articles');
		})
		.catch(function(response) {
			article.errors = response.data;
		});
	};
}
function ArticleUpdateController($stateParams, $state, articleData, Articles) {
  var article = this;
  article.title = 'Update';
  article.data = articleData.data;
  article.save = function() {
    Articles.update($stateParams.id,article.data).then(function(response) {
      $state.go('articles');
    })
    .catch(function(response) {
      article.errors = response.data;
    });
  };
}
function ArticleShowController($stateParams, articleData) {
  var article = this;
  article.data = articleData.data;console.log(articleData.data);
}
function ArticleDestroyController($modalInstance, articleData, Articles) {
  var article = this;
  article.data = articleData;
  article.ok = function () {
    $modalInstance.close(articleData);
  };
  article.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}
angular.module('articles.controllers', [])
    .controller('ArticlesController', ArticlesController)
    .controller('ArticleCreateController', ArticleCreateController)
    .controller('ArticleUpdateController', ArticleUpdateController)
     .controller('ArticleShowController', ArticleShowController)
    .controller('ArticleDestroyController', ArticleDestroyController);
})();
