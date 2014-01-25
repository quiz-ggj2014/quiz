angular.module('Quiz').controller('GameCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    
    var buttonsDisabled = false;
    
    $scope.username = 'Foo';
    $scope.score = 0;
    
    // load the questions.
    $http.get("/api/questions")
        .success(function(res) {
            var questions = res.data.questions;
            $scope.score = res.data.user.score;
            /**
             * Displays the next question.
             */
            var nextQuestion = function() {
                
                if (questions.length) {
                    var next = questions.pop();
                    $scope.question = next;
                    buttonsDisabled = false;
                } else {
                    // todo: end the game
                }
            };
            
            /**
            * Invoked when an answer is selected.
            */
            $scope.selectAnswer = function(questionId, answer) {
                // save the answer to the server.
                buttonsDisabled = true;
                
                $http.post("/api/answer", {question: questionId, answer: answer})
                    .success(function(res) {
                        console.log(res);
        
                        // todo: display the percentages
        
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