(function() {
'use strict';

function config($stateProvider) {
    $stateProvider      
        .state('home', {
            url: '/',
            templateUrl: 'core/templates/index.html',
            controller:'CoreController as core'
    });
}

angular.module('core.routes', [])
    .config(config);
})();
