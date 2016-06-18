var express = require('express');
var app = express();
var config = require('./config/index');
var mongoose = require('mongoose');
// var loginController = require('./controllers/login.controller');
// var receptionController = require('./controllers/reception.controller');
// var userController = require('./controllers/user.controller');
// var locationController = require('./controllers/location.controller');
var cors = require('cors');

var serverLogging = function(req, res, next){
	console.log(req.method, req.url);
	next();
};

app.use(cors());
app.use(serverLogging);

mongoose.connect(config.getDBConnectionString());


app.get('/', function(req, res){
   res.send("testing");
});

// loginController(app);
// receptionController(app);
// userController(app);
// locationController(app);

process.env.PORT = process.env.PORT || 80;

app.listen(process.env.PORT, function(){
    console.log("running on " + process.env.PORT);
});