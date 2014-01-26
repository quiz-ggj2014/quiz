angular.module('Quiz').controller('WinCtrl', ['$scope', function($scope) {

    $scope.score = currScore;

    var playSound = function(src) {
        var sound = new Audio(src);
        sound.play();
    };

    if (currScore > 0) {
        playSound('/static/audio/ui/feedback/applauses_short.wav');
    } else {
        playSound('/static/audio/effects/orkki_ja_muovikassi.wav');
    }

}]);