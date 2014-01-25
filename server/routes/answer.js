var mongoose = require('mongoose'),
    server   = require('../server.js'),
    user     = require('../helpers/JAMUser.js'),
    model    = require('../models/models.js'),
    Response = require('../helpers/response.js');
    
    
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
            model.Question.findOne({ _id: question }, function( err, q ) {
                if (err) {
                    res.status(500).send("Something wrong with fetching question :(");
                    console.log(err);
                    return;
                }
                
                var results = {
                    gotPoints: false,
                    answers: []
                }
                
                var mostAnswered = null;
                for(var i = 0; i < q.answers.length; i++) {
                    var a = q.answers[i];
                    if (a.answer == answer) {
                        a.numAnswered++;
                        q.numAnswered++;
                        a.percentAnswered = Math.round( a.numAnswered / q.numAnswered );
                        a.save();
                    }
                    if (!mostAnswered || a.numAnswered > mostAnswered.numAnswered) {
                        mostAnswered = a;
                    }
                    respoonse.answers.push(a);
                }
                
                if ( answer == mostAnswered.answer ) {
                    currUser.score++;
                    results.gotPoints = true;
                }
                
                res.send( new Response( user, results ) );
                
            });
            
        }
    }
};

module.exports = answer;