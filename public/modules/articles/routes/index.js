(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('auth.articles', {
            url: '/articles',
            templateUrl: 'articles/templates/index.html',
            controller:'ArticlesController as articles',
            resolve:{
            	articlesData : function(Articles){
            		return Articles.get();
            	}
            }
        })
        .state('article add', {
            url: '/article/add',
            templateUrl: 'articles/templates/form.html',
            controller:'ArticleAddController as article',
        })
        .state('article update', {
            url: '/article/update/:id',
            templateUrl: 'articles/templates/form.html',
            controller:'ArticleUpdateController as article',
            resolve: {
               articleData: function(Articles, $stateParams){
                    return Articles.getById($stateParams.id);
                }
            }
        });
}

angular.module('articles.routes', [])
    .config(config);
})();
