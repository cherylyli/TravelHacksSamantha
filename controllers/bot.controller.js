var microsoftConnection = require('../config/index');
var bodyParser = require('body-parser');
var funcs = require('../config/global_functions');
var querystring = require('querystring');
var request = require('request');
var mongoose = require('mongoose');
var Listing = require('../models/Listing.Model');

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
                var queryType = jbody.intents[0].intent;
                var keywords = [];
                jbody.entities.forEach(function(item){
                    keywords.push(item.entity);
                });
                
                if (queryType === "FindUtilities"){
                    //go to database and fetch pre-populated answers
                    Listing.findOne({id: req.body.id}, function(err, listingDetail){
                        if (err) throw err;
                        var response = {};
                        listingDetail.preDefinedQuestions.forEach(function(keywordAnswerPair){
                            //check if anything in the keywords match the keywords in the answer
                            keywordAnswerPair.keyword.forEach(function(key){
                                if (keywords.indexOf(key) >= 0) {
                                    response.push(keywordAnswerPair);
                                }
                            })
                        });
                        
                        console.log(listingDetail);
                        console.log(response);
                        res.json(response);
                        
                    });
                }

               
                

        	}
        });
    	
    });

} 

