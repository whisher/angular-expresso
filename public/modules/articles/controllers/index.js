(function() {
'use strict';

function ArticlesController(articlesData) {
    var articles = this;
    articles.data = articlesData.data;
}

angular.module('articles.controllers', [])
    .controller('ArticlesController', ArticlesController);
})();
