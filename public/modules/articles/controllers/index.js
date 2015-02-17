(function() {
'use strict';

function ArticlesController($rootScope, $templateCache, $modal, articlesData, Articles, Socket) {
  var articles = this;
  articles.data = articlesData.data;
  $rootScope.$on('article-has-been-deleted', function(event, id) { 
    var data = [];
        angular.forEach(articles.data, function(value, key) {
          if( value._id !== id){
            this.push(value);
          }
        }, data);
        articles.data = data;
  });
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

function ArticleShowController(articleData) {
  var article = this;
  article.data = articleData.data;
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
