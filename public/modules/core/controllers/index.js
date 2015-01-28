(function() {
'use strict';

function CoreController() {
  var core = this;
  core.welcome = 'Welcome to Angular Expresso.';
  core.prologue = 'A Simple and easy starting point for full stack javascript web development.';
}

angular.module('core.controllers', [])
    .controller('CoreController', CoreController);
})();
