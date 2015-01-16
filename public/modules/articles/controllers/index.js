(function() {
'use strict';

function ArticlesController($templateCache, $modal, articlesData, Articles, $state) {
  var articles = this;
  articles.data = articlesData.data;
  articles.open = function (article) {
    var modalInstance = $modal.open({
      template:  $templateCache.get('articles/templates/modalDelete.html'),
      controller: 'ArticleDeleteController',
      controllerAs: 'article',
      size: 'sm',
      resolve: {
        articleData: function(){
          return article;
        }
  	}
    });
    modalInstance.result.then(function (article) {
      Articles.delete(article._id).then(function(response) {
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
function ArticleAddController($state,Articles) {
      var article = this;
    	article.data = {};
    	article.save = function() {
    		Articles.add(article.data).then(function(response) {
		      console.log(response.data);
                 $state.go('articles');
		})
		.catch(function(response) {
			console.log(response);
                  article.errors = response.data;
		});
	};
}
function ArticleUpdateController($stateParams, articleData, Articles) {
	var article = this;
    	article.data = articleData.data;
    	article.save = function() {
    		Articles.update($stateParams.id,article.data).then(function(response) {
    			console.log(response.data);
    			$state.go('articles');
		})
		.catch(function(response) {
			console.log(response);
                  article.errors = response.data;
		});
	};
}
function ArticleDeleteController($modalInstance, articleData, Articles) {
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
    .controller('ArticleAddController', ArticleAddController)
    .controller('ArticleUpdateController', ArticleUpdateController)
    .controller('ArticleDeleteController', ArticleDeleteController);
})();
