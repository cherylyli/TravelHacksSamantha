var express = require('express');
var app = express();
var config = require('./config/index');
var botController = require('./controllers/bot.controller');
var cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect(config.getDBConnectionString());

var serverLogging = function(req, res, next){
	console.log(req.method, req.url);
	next();
};

app.use(cors());
app.use(serverLogging);

app.get('/', function(req, res){
   res.send("testing");
});

botController(app);
// receptionController(app);
// userController(app);
// locationController(app);

process.env.PORT = process.env.PORT || 80;

app.listen(process.env.PORT, function(){
    console.log("running on " + process.env.PORT);
});