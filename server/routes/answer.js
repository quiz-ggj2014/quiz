var mongoose = require('mongoose'),
    server   = require('../server.js');
    
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

    
    // Our beautiful Model. Bujah!
    var Answer = mongoose.model('Profile', answerSchema);

    return {
        /**
         *
         * @param req
         * @param res
         */
        postAnswer: function(req, res) {
            
            var question = req.query.question;
            var answer = req.query.answer;
            
            // Validate response
            if ( typeof( question ) == "undefined" || typeof( answer ) == "undefined" ) {
                res.status(404).send("Question & answer needed");
                return;
            }
            
            // Save answer
            var myAnswer = new Answer({
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
            
            Answer.find({ question: question }, function(err, answers) {
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
                
                // Convert to %
                for(var a in results) {
                    results[a] = Math.round( (results[a] / total)*100 );
                }
                
                
                res.send( results );
            });
            
        }
    }
};

module.exports = answer;