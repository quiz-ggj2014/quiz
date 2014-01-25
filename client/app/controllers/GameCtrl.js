angular.module('Quiz').controller('GameCtrl', ['$scope', '$http', function($scope, $http) {

    /**
     * Shuffles the given array using "Fisher-Yates".
     * @param {Array} array
     * @returns {Array}
     */
    var shuffle = function (array) {
        var counter = array.length,
            temp, index;

        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    };

    /**
     * Loads the questions.
     * @returns {Array}
     */
    var loadQuestions = function() {
        // todo: do an http request to the server to get the questions.
        return [
            {
                "id": "1",
                "image": "http://placehold.it/800x600&text=Q1",
                "text": "Text for question 1",
                "answers": [
                    "Answer 1",
                    "Answer two",
                    "Answer 3",
                    "Answer four"
                ]
            },
            {
                "id": "2",
                "image": "http://placehold.it/800x600&text=Q2",
                "text": "Text for question 2",
                "answers": [
                    "Answer one",
                    "Answer 2",
                    "Answer 3",
                    "Answer four"
                ]
            },
            {
                "id": "3",
                "image": "http://placehold.it/800x600&text=Q3",
                "text": "Text for question 3",
                "answers": [
                    "Answer 1",
                    "Answer two",
                    "Answer three",
                    "Answer 4"
                ]
            },
            {
                "id": "4",
                "image": "http://placehold.it/800x600&text=Q4",
                "text": "Text for question 4",
                "answers": [
                    "Answer one",
                    "Answer 2",
                    "Answer three",
                    "Answer 4"
                ]
            }
        ];
    };

    // load the questions and shuffle them.
    var questions = loadQuestions();
    questions = shuffle(questions);

    /**
     * Displays the next question.
     */
    var nextQuestion = function() {
        if (questions.length) {
            var next = questions.pop();
            next.answer = shuffle(next.answers);
            $scope.question = next;
        } else {
            // todo: end the game
        }
    };

    var saveAnswer = function(questionId, answer) {
        return $http.post("/api/answer", {question: questionId, answer: answer});
    };

    $scope.username = 'Foo';
    $scope.score = 0;

    /**
     * Invoked when an answer is selected.
     */
    $scope.selectAnswer = function(questionId, answer) {
        // save the answer to the server.
        saveAnswer(questionId, answer)
            .success(function(res) {
                console.log(res);

                // todo: display the percentages

                $scope.score += res.results['{{answer}}'];

                // wait a while and display the next question.
                setTimeout(function() {
                    nextQuestion();
                }, 3000);
            })
            .error(function(res) {
                console.debug('failed to save answer.');
            });
    };

    nextQuestion();

}]);