(function () {

    'use strict';
    
    var answerObjects = [];

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
     *
     * @param {Array} questions
     * @param {Phaser.Game} game
     * @constructor
     */
    var Quiz = function(questions, ui, game) {
        this.questions = questions;
        this.ui = ui;
        this.game = game;
    };

    /**
     * Starts the quiz.
     */
    Quiz.prototype.start = function() {
        this.questions = shuffle(this.questions);
        this.next();
    };

    /**
     * Presents the next question.
     */
    Quiz.prototype.next = function() {
        if (this.questions.length) {
            var question = this.questions.pop();
            question.answers = shuffle(question.answers);
            this.ui.renderQuestion(question, this);
        } else {
            console.debug('no more questions');
        }
    };

    Quiz.prototype.selectAnswer = function(index) {
        
        console.log('answer %d selected', index);
    };

    var Answer = function(x, y, index, value, style, quiz, game) {
        this.game = game;

        var sprite = this.game.add.sprite(x, y, 'button');
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(function() {
            quiz.selectAnswer(index);
            quiz.next();
        }, this);

        answerObjects.push(sprite);
        answerObjects.push(
            this.game.add.text(x + 10, y + 10, value, style)
        );
    };

    /**
     * Creates the user interface.
     * @param {Phaser.Game} game
     * @constructor
     */
    var UserInterface = function(game) {
        this.game = game;
    };

    /**
     * Renders the given question.
     * @param {Quiz} quiz
     * @param {Object} question
     */
    UserInterface.prototype.renderQuestion = function(question, quiz) {
        
        // Clear old entrys
        while(answerObjects.length) {
            var obj = answerObjects.pop();
            
            // TODO: Make objects reusable
            obj.destroy();
        }
        
        var center = {x: this.game.world.centerX, y: this.game.world.centerY},
            x = center.x - 300,
            startY = center.y + 100,
            y = startY,
            style = {font: '28px Arial', fill: '#ffffff', align: 'left'},
            padding = 10,
            answers = [];

        answerObjects.push(
            this.game.add.text(center.x - 300 + padding, center.y + 30 + padding, question.text, style)
        );

        for (var i = 0, l = question.answers.length; i < l; i++) {
            answers.push(new Answer(x, y, i, question.answers[i], style, quiz, this.game));
            
            if (i === 1) {
                x += 320;
                y = startY;
            } else {
                y += 70;
            }
        }
        
    };

    var questions = [
        {
            "image": "",
            "text": "Text for question 1",
            "answers": [
                "Answer 1",
                "Answer two",
                "Answer 3",
                "Answer four"
            ]
        },
        {
            "image": "",
            "text": "Text for question 2",
            "answers": [
                "Answer one",
                "Answer 2",
                "Answer 3",
                "Answer four"
            ]
        },
        {
            "image": "",
            "text": "Text for question 3",
            "answers": [
                "Answer 1",
                "Answer two",
                "Answer three",
                "Answer 4"
            ]
        },
        {
            "image": "",
            "text": "Text for question 4",
            "answers": [
                "Answer one",
                "Answer 2",
                "Answer three",
                "Answer 4"
            ]
        }
    ];

    /**
     *
     * @param {Phaser.Game} game
     */
    var preload = function (game) {
        game.load.image('button', 'img/button.png');

        console.log('preload done ...');
    };

    var quiz, ui;

    /**
     *
     * @param {Phaser.Game} game
     */
    var create = function (game) {
        // Create the game objects.
        ui = new UserInterface(game);
        quiz = new Quiz(questions, ui, game);

        // Start the quiz.
        quiz.start();

        console.log('create done ...');
    };

    /**
     *
     * @param {Phaser.Game} game
     */
    var update = function (game) {
        // Nothing here yet ...
    };

    new Phaser.Game(800, 600, Phaser.AUTO, 'quiz', {
        preload: preload,
        create: create,
        update: update
    });

})();