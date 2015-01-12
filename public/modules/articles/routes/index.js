(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('articles', {
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
            
        });
}

angular.module('articles.routes', [])
    .config(config);
})();
