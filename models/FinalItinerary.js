const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinalItinerarySchema = new Schema({
    itineraryItems: [ItineraryItemSchema],
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = FinalItinerary = mongoose.model("FinalItinerary", FinalItinerarySchema);