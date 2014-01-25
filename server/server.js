// require dependencies
var express  = require('express'),
    mongoose = require('mongoose'),
    path = require("path");

var config = {
    webRoot: path.resolve(__dirname, '../client/web'),
    listenPort: 8000
}

// bootstrap express
var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.configure('development', function(){
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});

// Set up session
app.use(express.cookieParser());
app.use(express.session({secret: 'pwewifhwliuqrgayou314o247t7359gh7989'}));

// we serve static files under /static
app.use('/static', express.static(config.webRoot));

// connect to mongodb
mongoose.connect('mongodb://localhost/quiz');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function() {
    console.log('connected to database.');
});

// set up the quiz
var answer   = require('./routes/answer')(),
    question = require('./routes/question')();
    userinfo = require('./routes/userinfo')();

app.post('/api/answer', answer.postAnswer);
app.post('/api/question', question.postQuestion);
app.get('/api/questions', question.getQuestions);
app.get('/api/userinfo', userinfo.get);

// all other requests are redirected to our index.html file
app.get('*', function(req, res) {
    res.sendfile('index.html', {root: config.webRoot});
});

// start the server
app.listen(config.listenPort);
console.log('Listening on port ' + config.listenPort + '...');