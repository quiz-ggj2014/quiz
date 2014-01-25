var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
    question: String,
    answer: String
});

module.exports = mongoose.model('Answer', answerSchema);