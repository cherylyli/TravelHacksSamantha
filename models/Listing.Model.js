var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
   username: String,
   locationLong: Number,
   locationLat: Number,
   packName: String,
   interest: [String]
});
var Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;