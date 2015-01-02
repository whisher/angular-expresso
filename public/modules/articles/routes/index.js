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
    });
}

angular.module('articles.routes', [])
    .config(config);
})();
