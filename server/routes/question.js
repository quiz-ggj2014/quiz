var mongoose     = require('mongoose'),
    Q            = require('q'),
    user_session = require('../helpers/user_session.js')(),
    Response     = require('../helpers/response.js');


var answerSchema = mongoose.Schema({
    text: String,
    numAnswered: Number,
    percentAnswered: Number
});

var questionSchema = mongoose.Schema({
    text: String,
    type: String,
    src: String,
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    numAnswered: Number
});

var Answer = mongoose.model('Answer', answerSchema),
    Question = mongoose.model('Question', questionSchema);

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
 * Question route.
 * @returns {Function}
 */
var question = function() {

    return {
        /**
         *
         * @param req
         * @param res
         */
        answerQuestion: function(req, res) {
            var userSession = user_session.get(req),
                question = req.body.question,
                answer = req.body.answer;

            // Validate response
            if ( typeof question == "undefined" || typeof answer == "undefined" ) {
                res.status(404).send("Question & answer needed");
                return;
            }

            // Get question model
            Question.findOne({ _id: question }).populate('answers').exec(function( err, q ) {
                if (err) {
                    res.status(500).send("Something wrong with fetching question :(");
                    console.log(err);
                    return;
                }

                if (!q) {
                    console.log("No question found with id %s", question);
                    res.status(500).send("No question found");
                    return;
                }

                var answers = [];
                var mostAnswered = null;
                var wasWinningAnswer = false;

                for(var i = 0; i < q.answers.length; i++) {
                    var a = q.answers[i];
                    if (a._id == answer) {
                        a.numAnswered += 1;
                        q.numAnswered += 1;
                    }
                    // Always update percentages
                    a.percentAnswered = Math.round( (a.numAnswered / q.numAnswered) * 100 );
                    a.save();
                    q.save();

                    if (!mostAnswered || a.numAnswered > mostAnswered.numAnswered) {
                        mostAnswered = a;
                    }
                    answers.push(a);
                }

                if ( answer == mostAnswered._id ) {
                    userSession.score++;
                    wasWinningAnswer = true;
                }

                var response = new Response({user: userSession, answers: answers, wasWinningAnswer : wasWinningAnswer});
                res.send(response.success());

            });

        },

        /**
         * Adds a new question to database
         * @param req
         * @param res
         */
        addQuestion: function(req, res) {

            var userSession = user_session.get(req),
                question = req.body.question || req.query.question,
                answers = req.body.answers || req.query.answers,
                type = req.body.type || req.query.type,
                src = req.body.src || req.query.src;

            // Validate response
            if ( typeof question == "undefined" || typeof answers == "undefined" || typeof type == "undefined" || typeof src == "undefined" ) {
                res.status(404).send("Question & answers needed");
                return;
            }

            var answersArr = [],
                chain = Q.fcall(function() {});

            for( var i = 0; i < answers.length; i++ ) {
                var newAnswer = new Answer({
                    text: answers[i],
                    numAnswered: 0,
                    percentAnswered: 0
                });

                (function(newAnswer) {
                    chain = chain.then(function() {
                        var deferred = Q.defer();
                        newAnswer.save(function(err) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                answersArr.push(newAnswer._id);
                                deferred.resolve(newAnswer);
                            }
                        });
                        return deferred.promise;
                    });
                })(newAnswer);
            }

            chain.then(function() {
                // Save question
                var myQuestion = new Question({
                    text: question,
                    type: type,
                    src: src,
                    answers: answersArr,
                    numAnswered: 0
                });

                var response = new Response({user: userSession});

                myQuestion.save(function( err ) {
                    if(err){
                        console.log(err);
                        res.send(response.error());
                    } else {
                        res.send(response.success());
                    }
                });
            });
        },

        listQuestions: function(req, res) {
            var userSession = user_session.get(req);

            Question.find({}).populate('answers', 'text').exec(function(err, questions) {
                if (err) {
                    console.log(err);
                } else {
                    questions = shuffle(questions);
                    for (var i = 0; i < questions.length; i++) {
                        questions[i].answers = shuffle(questions[i].answers);
                    }

                    var response = new Response({user: userSession, questions: questions});
                    res.send(response.success());
                }
            });
        }
    }
};

module.exports = question;