var express = require('express');
var app = express();
var config = require('./config/index');
var botController = require('./controllers/bot.controller');
var setupController = require('./controllers/setup.controller');
var cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect(config.getDBConnectionString());


var serverLogging = function(req, res, next){
	console.log(req.method, req.url);
	next();
};

app.use(cors());
app.use(serverLogging);
app.use('/assets', express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get('/', function(req, res){
    console.log("got '/'");
    res.send("hi");
});

app.get('/newlisting', function(req, res){
   res.render(__dirname + '/views/index');
});

app.get('/add', function(req, res){
    res.render(__dirname + '/views/addQ');
})

botController(app);
setupController(app);


process.env.PORT = process.env.PORT || 80;

app.listen(process.env.PORT, function(){
    console.log("running on " + process.env.PORT);
});