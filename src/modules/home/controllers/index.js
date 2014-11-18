(function() {
'use strict';

function HomeController() {
    var home = this;
    home.welcome = 'Welcome!';
}

angular.module('home.controllers', [])
    .controller('HomeController', HomeController);
})();
