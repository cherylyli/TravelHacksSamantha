var Listing = require('../models/Listing.Model');
var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    //interface for listing owners to set things up
    app.post('/newlisting', function(req, res){
       //create a new listing, with no questions and answers
       
       
        var newListing = Listing ({
                        listingName: req.body.listingname || "Default Listing",
                        address: req.body.address || "3455 Stanley",
                        listingDescription: req.body.description || "This is Cheryl's Default Listing",
                        phone: req.body.phone || "514-560-8888",
                        predefinedQuestions: []
                    });
                    
        //send back an ID
        newListing.save(function(err, getID){
            if (err) throw err;
            res.send(getID.id);
        });
       
       
        
    });
    
    //push new defined questions onto database
    app.post('/newListingQuestions', function(req, res){
        Listing.findOne({id: req.body.id}, function(err, data){
            if (err) throw err;
            //parse keywords into an array
            var keyword = req.body.keyword.split(' ');
            
            data.predefinedQuestions.push(
                {
                    keyword: keyword,
                    answer: req.body.answer
                }
            );
            data.save(function(err, getID){
               if (err) throw err; 
               res.send(getID.id);
            });
            

        });
        
    });
    
    
    
}