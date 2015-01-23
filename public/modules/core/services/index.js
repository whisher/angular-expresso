(function() {
  'use strict';

var DEBUG = true;
var VERSION = '1.0.0';

angular.module('core.services', [])
    .constant('DEBUG', DEBUG)
    .constant('VERSION', VERSION);
})();