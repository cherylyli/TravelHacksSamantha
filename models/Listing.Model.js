var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
   listingName: String,
   location: String,
   listingDescription: String,
   phone: String,
   predefinedQuestions: [
      {
         keyword: [String],
         answer: String
      }
   ]
});
var Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;