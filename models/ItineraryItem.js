const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItineraryItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = ItineraryItem = mongoose.model("ItineraryItem", ItineraryItemSchema);