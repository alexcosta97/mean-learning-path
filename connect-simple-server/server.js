var connect = require('connect');
//start the connect server
var app = connect();

//create logger middleware
var logger = function(req, res, next){
    console.log(req.method, req.url);
    next();
}

//set function that prepares the response
// -- middleware function
var helloWorld = function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
};

var goodbyeWorld = function(req, res, next){
    res.setHeader('Context-Type', 'text/plan');
    res.end('Goobye World!');
}

//registering the middlewares
// FIFO -> First registered is the first used
app.use(logger);
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);

//set up the connect server to listen to port 3000
app.listen(3000);

console.log('Server running at http://localhost:3000/');