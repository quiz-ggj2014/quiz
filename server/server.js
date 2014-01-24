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

// we serve static files under /static
app.use('/static', express.static(config.webRoot));

// connect to mongodb
mongoose.connect('mongodb://localhost/quiz');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function() {
    console.log('connected to database.');
});

// set up the hello api
var answer   = require('./routes/answer')();

app.post('/api/answer', answer.postAnswer); // Change to post, idgit

// all other requests are redirected to our index.html file
app.get('*', function(req, res) {
    res.sendfile('index.html', {root: config.webRoot});
});

// start the server
app.listen(config.listenPort);
console.log('Listening on port ' + config.listenPort + '...');