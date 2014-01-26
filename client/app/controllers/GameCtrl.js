var currScore = 0; // Nyt oiotaan kun on kiire

angular.module('Quiz').controller('GameCtrl', ['$scope', '$state', '$http', '$timeout', function($scope, $state, $http, $timeout) {

    var buttonsDisabled = false;
    
    $scope.score = 0;
    $scope.musicPlaying = false;

    var player = document.getElementById('player');

    $scope.playMusic = function() {
        player.play();
        $scope.musicPlaying = true;
    };

    $scope.stopMusic = function() {
        player.pause();
        $scope.musicPlaying = false;
    };

    var playSound = function(src) {
        var sound = new Audio(src);
        sound.play();
    };

    // Start the music.
    $scope.playMusic();
    
    $http.post("/api/player/clear");

    $http.get("/api/questions")
        .success(function(res) {
            var questions = res.data.questions;

            $scope.score = res.data.user.score;

            /**
             * Displays the next question.
             */
            var nextQuestion = function() {
                if (questions.length) {
                    $scope.question = questions.pop();
                    buttonsDisabled = false;
                } else {
                    $state.go('win');
                }
            };
            
            /**
            * Invoked when an answer is selected.
            */
            $scope.selectAnswer = function(questionId, answer) {
                if (buttonsDisabled) {
                    return;
                }

                // save the answer to the server.
                buttonsDisabled = true;

                playSound('/static/audio/ui/click/click.wav');
                
                // Loop trough answers to find out which (total) answer was pressed
                for (var i = 0; i < $scope.question.answers.length; i++) {
                    if (answer == $scope.question.answers[i]._id) {
                        currentAnswer = $scope.question.answers[i].clicked = "clicked";
                        break;
                    }
                }
                
                $http.post("/api/question/answer", {question: questionId, answer: answer})
                    .success(function(res) {
                        currScore = $scope.score = res.data.user.score;

                        for(var i = 0; i < res.data.answers.length; i++) {
                            for (var j = 0; j < $scope.question.answers.length; j++) {
                                if (res.data.answers[i]._id == $scope.question.answers[j]._id) {
                                    $scope.question.answers[j] = res.data.answers[i];
                                    if (answer == $scope.question.answers[j]._id) {
                                        $scope.question.answers[j].clicked = "clicked";
                                        $scope.question.answers[j].wasright = res.data.wasWinningAnswer ? "winning" : "notwinning";
                                    }
                                    break;
                                }
                            }
                        }

                        if (res.data.wasWinningAnswer) {
                            playSound('/static/audio/ui/feedback/Synth_Success.wav');
                        } else {
                            playSound('/static/audio/ui/feedback/Synth_NotSoGood.wav');
                        }
        
                        // wait a while and display the next question.
                        $timeout(function() {
                            // Make sure image gets cleared
                            $scope.question.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAIBTAA7";
                        }, 2800);
                        $timeout(function() {
                            nextQuestion();
                        }, 3000);
                    })
                    .error(function(res) {
                        console.debug('failed to save answer.');
                    });
            };
            
            nextQuestion();
        });

}]);