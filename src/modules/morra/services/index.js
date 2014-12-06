(function() {
'use strict';

    function Player() {
        var imgs = [
            'paper',
            'rock',
            'scissor'
        ];
        var win = {
            'paper_rock':true,
            'paper_scissor':false,
            'rock_paper':false,
            'rock_scissor':true,
            'scissor_paper':true,
            'scissor_rock':false
        };
        var serverScore = 0,playerScore = 0;
        return {
            get: function(index) {
                return index ? imgs[index] : imgs;
            },
            isWin:function(server,player){
                return win[server + '_' + player];
            },
            shuffle: function(current) {
                var array = angular.copy(imgs);
                var indexToDelete = array.indexOf(current); 
                if (indexToDelete > -1) {
                    array.splice(indexToDelete, 1);
                }
                
                var counter = array.length, temp, index;

                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);

                    // Decrease counter by 1
                    counter--;

                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }

                return array;
            }
        };
    }

angular.module('morra.services', [])
    .factory('Player', Player);
})();
