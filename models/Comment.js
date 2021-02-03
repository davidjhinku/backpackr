const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        handle: String
    },
    comment: {
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


module.exports = Comment = mongoose.model('Comment', CommentSchema);