(function() {
'use strict';

function HomeController() {
    var home = this;
    home.welcome = 'Welcomesyewffcc!';
}

angular.module('home.controllers', [])
    .controller('HomeController', HomeController);
})();
