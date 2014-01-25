var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
    answer: String,
    numAnswered: Number,
    percentAnswered: Number
});

module.exports = mongoose.model('Answer', answerSchema);