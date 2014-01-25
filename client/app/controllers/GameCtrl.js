angular.module('Quiz').controller('GameCtrl', ['$scope', '$state', '$http', '$timeout', function($scope, $state, $http, $timeout) {

    var buttonsDisabled = false;
    
    $scope.score = 0;
    
    // load the questions.
    $http.get("/api/userinfo/clear");
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
                
                $http.post("/api/answer", {question: questionId, answer: answer})
                    .success(function(res) {
                        $scope.score = res.data.user.score;

                        for(var i = 0; i < res.data.answers.length; i++) {
                            for (var j = 0; j < $scope.question.answers.length; j++) {
                                if (res.data.answers[i]._id == $scope.question.answers[j]._id) {
                                    $scope.question.answers[j] = res.data.answers[i];
                                    break;
                                }
                            }
                        }
        
                        // wait a while and display the next question.
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