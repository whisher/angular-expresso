(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('morra', {
            url: '/morra',
            templateUrl: 'templates/morra/index.html',
            controller:'MorraController as mrr'
    });
}

angular.module('morra.routes', [])
    .config(config);
})();


