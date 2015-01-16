(function() {
'use strict';

function CoreController() {
  var core = this;
  core.welcome = 'Welcome!';
  core.prologue = 'Angular express just an other mean stack';
}
function NavController(){
  var nav = this;
  nav.isopen = false;
  nav.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    nav.isopen = !nav.isopen;
  };
}
angular.module('core.controllers', [])
    .controller('CoreController', CoreController)
    .controller('NavController', NavController);
})();
