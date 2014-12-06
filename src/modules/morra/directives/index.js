(function() {
  'use strict';

  function player($templateCache,Player) {
    return {
      restrict: 'E',
      template:$templateCache.get('templates/morra/player.html'),
      controller:function($scope,$element){
        $scope.images = Player.get();
        $scope.currentPlayer = '';
        $scope.currentServer = '';
        $scope.play = function(img){
            var currentPlayer = img.img;
            var currentServer = Player.shuffle(currentPlayer)[0];
            console.log(currentPlayer);
            console.log(currentServer);
             $scope.currentPlayer = currentPlayer;
        $scope.currentServer = currentServer;
            console.log(Player.isWin(currentServer,currentPlayer));
        };
      },
      link: function(scope, element, attrs) {
        
      }
    };
  }

  angular.module('morra.directives', [])
    .directive('player', player);
})();

