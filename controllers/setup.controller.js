var Listing = require('../controllers/setup.controller.js');
var bodyParser = require('body-parser');

module.exports = function(app){
    //interface for listing owners to set things up
    app.post('/newlisting', function(req, res){
       //create a new listing, with no questions and answers
        var newListing = Listing ({
                        listingName: req.body.listingname,
                        latLong: [req.body.lat, req.body.long],
                        listingDescription: req.body.description,
                        owner: {
                            name: req.body.ownername,
                            phone: req.body.phone
                        },
                        predefinedQuestions: []
                    });
                    
        newListing.save(function(err){
           if (err) throw err;
           res.send("success");
        });
       
       
        
    });
    
    app.post('/newListingQuestions', function(req, res){
        
    });
    
    
    
}