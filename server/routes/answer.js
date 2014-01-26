var mongoose = require('mongoose'),
    Q        = require('q'),
    server   = require('../server.js'),
    user     = require('../helpers/JAMUser.js'),
    //model    = require('../models/models.js'),
    Response = require('../helpers/response.js');
    

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
 * Answer route.
 * @param {Object} params
 * @returns {Object}
 */
var answer = function() {

    return {
        /**
         *
         * @param req
         * @param res
         */
        postAnswer: function(req, res) {
            
            var currUser = user(req); // Current user
            
            var question = req.body.question;
            var answer = req.body.answer;
            
            // Validate response
            if ( typeof( question ) == "undefined" || typeof( answer ) == "undefined" ) {
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
                    // Always update precentages
                    a.percentAnswered = Math.round( (a.numAnswered / q.numAnswered) * 100 );
                    a.save(function(err, model, numAffected) {
                        //console.log(arguments);
                    });
                    
                    q.save();
                    
                    if (!mostAnswered || a.numAnswered > mostAnswered.numAnswered) {
                        mostAnswered = a;
                    }
                    answers.push(a);
                }
                
                if ( answer == mostAnswered._id ) {
                    req.session.user.score++;
                    wasWinningAnswer = true;
                }
                
                res.send( new Response( { user: currUser, answers: answers, wasWinningAnswer : wasWinningAnswer } ));
                
            });
            
        },
        
        /**
         * Adds a new question to database
         * @param req
         * @param res
         */
        postQuestion: function(req, res) {
            
            var currUser = user(req); // Current user
            
            var question = req.body.question || req.query.question;
            var answers = req.body.answers || req.query.answers;
            var type = req.body.type || req.query.type;
            var src = req.body.src || req.query.src;
            
            // Validate response
            if ( typeof( question ) == "undefined" || typeof( answers ) == "undefined" || typeof( type ) == "undefined" || typeof( src ) == "undefined" ) {
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
                myQuestion.save(function( err ) {
                    if(err){
                        console.log(err);
                        res.send( new Response( user, { success: false } ) );
                    } else {
                        res.send( new Response( user, { success: true } ) );
                    }
                });
            });
        },
        
        getQuestions: function(req, res) {
            
            var currUser = user(req); // Current user
             
            Question.find({}).populate('answers', 'text').exec(function(err, questions) {
                if (err) {
                    console.log(err);
                } else {
                    questions = shuffle(questions);
                    for (var i = 0; i < questions.length; i++) {
                        questions[i].answers = shuffle(questions[i].answers);
                    }
                    
                    res.send( new Response( { user: currUser, questions: questions } ) );
                }
                
                
                
                
                
            });
             
        }
    }
};

module.exports = answer;