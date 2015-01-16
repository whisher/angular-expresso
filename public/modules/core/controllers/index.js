(function() {
'use strict';

function CoreController() {
  var core = this;
  core.welcome = 'Welcome!';
  core.prologue = 'Angular express just an other mean stack';
}

angular.module('core.controllers', [])
    .controller('CoreController', CoreController);
})();
