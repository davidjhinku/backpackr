const mongoose = require("mongoose");
const ItineraryItem = require("./ItineraryItem");
const User = require("./User");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    users: [mongoose.Schema.Types.ObjectId],
    destination: {
        type: String,
        required: true
    },
    tripName: {
        type: String,
        required: true
    },
    comments: [mongoose.Schema.Types.ObjectId],
    itineraryItems: [mongoose.Schema.Types.ObjectId],
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = Trip = mongoose.model("Trip", TripSchema);