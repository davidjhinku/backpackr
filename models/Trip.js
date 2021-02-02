const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Register Schemas
const ItineraryItemSchema = require("./ItineraryItem");
const UserSchema = require("./User");
const CommentSchema = require("./Comment");

const TripSchema = new Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    destination: {
        type: String,
        required: true
    },
    tripName: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    itineraryItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ItineraryItem"
    }],
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = Trip = mongoose.model("Trip", TripSchema);