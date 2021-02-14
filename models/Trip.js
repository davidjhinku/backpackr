const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Register Schemas
const ItineraryItemSchema = require("./ItineraryItem");
const FlightItineraryItemSchema = require("./FlightItineraryItem");
const LodgingItineraryItemSchema = require("./LodgingItineraryItem");
const FoodItineraryItemSchema = require("./FoodItineraryItem");
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
    flightItineraryItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FlightItineraryItem"
    }],
    lodgingItineraryItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LodgingItineraryItem"
    }],
    foodItineraryItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItineraryItem"
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