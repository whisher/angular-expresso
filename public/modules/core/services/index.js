(function() {
  'use strict';

var DEBUG = true;
var VERSION = '1.0.0';
var HAS_MODAL_LOGIN = true;
angular.module('core.services', [])
    .constant('DEBUG', DEBUG)
    .constant('VERSION', VERSION)
    .constant('HAS_MODAL_LOGIN', HAS_MODAL_LOGIN);
})();