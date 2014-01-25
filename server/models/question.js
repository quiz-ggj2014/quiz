var mongoose = require('mongoose'),
    Answer   = require('../models/answer.js');

var questionSchema = mongoose.Schema({
    question: String,
    answers: Array,
    numAnswered: Number
});

module.exports = mongoose.model('Question', questionSchema);