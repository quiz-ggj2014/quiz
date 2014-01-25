var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
    answer: String,
    numAnswered: Number,
    percentAnswered: Number
});

var questionSchema = mongoose.Schema({
    question: String,
    type: String,
    src: String,
    answers: { type: mongoose.Schema.ObjectId, ref: 'answerSchema' },
    numAnswered: Number
});

module.exports = mongoose.model('Question', questionSchema);