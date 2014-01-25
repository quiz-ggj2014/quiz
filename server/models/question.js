var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    question: String,
    answers: Array
});

module.exports = mongoose.model('Question', questionSchema);