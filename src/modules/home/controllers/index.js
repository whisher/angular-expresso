(function() {
'use strict';

function HomeController() {
    var home = this;
    home.test = 'OhPippo';
}

angular.module('home.controllers', [])
    .controller('HomeController', HomeController);
})();
