//get request to url and get json back

var microsoftConnection = require('../config/index');
var bodyParser = require('body-parser');
var funcs = require('../config/global_functions');
var querystring = require('querystring');
var request = require('request');
var mongoose = require('mongoose');
var listing = require('../models/Listing.Model');

//form a nice little querystring and go get data, parse data and return
module.exports = function(app){
	//send request to microsoft & parse JSON
	app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    app.post('/ask', function(req, res){
		var microsoftQuery = querystring.stringify({q: req.body.query});
		//console.log(microsoftQuery);
		microsoftQuery = microsoftConnection.getMicrosftConnection() + '&' + microsoftQuery
		//console.log(microsoftQuery);

    	request(microsoftQuery, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var jbody = JSON.parse(body);
                //parse the body to get intent & entities
                var queryType = jbody.query;
                var entities = jbody.entities;
                res.send({
                	"query": queryType,
                	"entities": entities
                	});

                //go to database and fetch pre-populated answers
                

        	}
        });
    	
    });

} 

