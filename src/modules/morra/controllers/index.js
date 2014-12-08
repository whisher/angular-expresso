(function() {
'use strict';

function MorraController() {
    var mrr = this;
    mrr.welcome = 'Welcome!';
}

angular.module('morra.controllers', [])
    .controller('MorraController', MorraController);
})();
