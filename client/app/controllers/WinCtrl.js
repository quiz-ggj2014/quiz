angular.module('Quiz').controller('WinCtrl', ['$scope', function($scope) {

    $scope.score = currScore;

    var playSound = function(src) {
        var sound = new Audio(src);
        sound.play();
    };

    playSound('/static/audio/ui/feedback/applauses_short.wav');

}]);