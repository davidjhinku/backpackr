const mongoose = require("mongoose");
const ItineraryItem = require("./ItineraryItem");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    users: [UserSchema],
    destination: {
        type: String,
        required: true
    },
    tripName: {
        type: String,
        required: true
    },
    comments: [CommentSchema],
    itineraryItems: [ItineraryItemSchema],
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = Trip = mongoose.model("Trip", TripSchema);