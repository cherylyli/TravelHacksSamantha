var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
   listingName: String,
   latLong: [Number, Number],
   listingDescription: String,
   owner: {
      name: String,
      phone: Number
   },
   predefinedQuestions: [
      {
         queryType: String,
         keyword: [String],
         answer: String
      }
   ]
});
var Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;