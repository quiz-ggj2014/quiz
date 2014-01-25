var mongoose = require('mongoose'),
    server   = require('../server.js'),
    model    = require('../models/models.js'),
    user     = require('../helpers/JAMUser.js'),
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
        postQuestion: function(req, res) {
            
            var currUser = user(req); // Current user
            
            var question = req.body.question || req.query.question;
            var answers = req.body.answers || req.query.answers;
            
            // Validate response
            if ( typeof( question ) == "undefined" || typeof( answers ) == "undefined" ) {
                res.status(404).send("Question & answers needed");
                return;
            }
            
            var answersArr = [];
            for( var i = 0; i < answers.length; i++ ) {
                answersArr.push(new model.Answer({
                    name: answers[i],
                    numAnswered: 0,
                    percentAnswered: 0
                }));
            }
            
            // Save question
            var myQuestion = new model.Question({
                question: question,
                answers: answers
            });
            myQuestion.save(function( err ) {
                if(err){
                    res.send( new Response( user, { success: false } ) );
                } else {
                    res.send( new Response( user, { success: true } ) );
                }
            });
        
        },
        
        getQuestions: function(req, res) {
            
            var currUser = user(req); // Current user
             
            model.Question.find({}, function(err, questions) {
                if (err) {
                    
                }
                res.send( new Response( user, questions ) );
            });
             
        }
    }
};

module.exports = answer;