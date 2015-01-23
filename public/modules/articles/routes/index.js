(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('articles', {
            url: '/articles',
            templateUrl: 'articles/templates/index.html',
            controller:'ArticlesController',
            controllerAs: 'articles',
            resolve:{
            	articlesData : function(Articles){
            		return Articles.get();
            	}
            }
        })
        .state('article create', {
            url: '/article/create',
            templateUrl: 'articles/templates/form.html',
            controller:'ArticleCreateController',
            controllerAs: 'article'
        })
        .state('article update', {
            url: '/article/update/:id',
            templateUrl: 'articles/templates/form.html',
            controller:'ArticleUpdateController',
            controllerAs: 'article',
            resolve: {
               articleData: function(Articles, $stateParams){
                    return Articles.show($stateParams.id);
                }
            }
        })
        .state('article show', {
            url: '/article/show/:id',
            templateUrl: 'articles/templates/show.html',
            controller:'ArticleShowController',
            controllerAs: 'article',
            resolve: {
               articleData: function(Articles, $stateParams){
                    return Articles.show($stateParams.id);
                }
            }
        });
}

angular.module('articles.routes', [])
    .config(config);
})();
