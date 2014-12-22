(function() {
'use strict';

function HomeController() {
    var home = this;
    home.welcome = 'Welcomesy!';
}

angular.module('home.controllers', [])
    .controller('HomeController', HomeController);
})();
