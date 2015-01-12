(function() {
'use strict';

function ArticlesController(articlesData) {
	var articles = this;
    	articles.data = articlesData.data;
}
function ArticleAddController(Articles) {
	var article = this;
    	article.data = {};
    	article.save = function() {
    		Articles.add(article.data).then(function(response) {
			console.log(response.data);
		})
		.catch(function(response) {
			console.log(response);
		});
	};
}
angular.module('articles.controllers', [])
    .controller('ArticlesController', ArticlesController)
    .controller('ArticleAddController', ArticleAddController);
})();
