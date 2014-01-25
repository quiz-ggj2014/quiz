var mongoose = require('mongoose'),
    server   = require('../server.js'),
    user     = require('../helpers/JAMUser.js'),
    model    = require('../models/models.js');
    
    
/**
 * Answer route.
 * @param {Object} params
 * @returns {Object}
 */
var answer = function() {

    var answerSchema = mongoose.Schema({
        question: String,
        answer: String
    });

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
            
            // Save answer
            var myAnswer = new model.Answer({
                question: question,
                answer: answer
            });
            myAnswer.save(function( err ) {
                if(err){
                    console.log("ERROR");
                    console.log(err);
                }
            });
            
            /**
             * There should be no differnece whether we happen to
             * manage to save out rensponse or not (at this point).
             * When we have multiplayer, we can change this to more
             * procedural kind of thingie.
             **/
            
            // TODO: Change to Answer.count
            model.Answer.find({ question: question }, function(err, answers) {
                if (err) {
                    res.status(500).send("Something wrong with saving data :(");
                    console.log(err);
                    return;
                }
                
                var results = {};
                var total = 0;
                answers.forEach(function(a) {
                    var answer = a.answer;
                    if ( typeof( results[answer] ) == "undefined" ) {
                        results[answer] = 0;
                    }
                    
                    results[answer]++;
                    total++;
                });
                
                var winning = null;
                for(var a in results) {
                    // Convert to %
                    results[a] = Math.round( (results[a] / total)*100 );
                    
                    // And calculate the winning result
                    if (!winning || winning.p < results[a]) {
                        winning = {
                            p: results[a],
                            name: a
                        }
                    }
                }
                
                
                if ( !winning || winning.name == answer ) {
                    // We have a winner!
                    currUser.score++;
                }
                
                // TODO: Do this as own object
                var standardizedRequest = {
                    results: results,
                    user: currUser
                }
                
                
                res.send( standardizedRequest );
            });
            
        }
    }
};

module.exports = answer;