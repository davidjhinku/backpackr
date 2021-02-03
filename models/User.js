const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            require: true
        }
    },
    {
    timestamps: true
    }
);

module.exports = User = mongoose.model("User", UserSchema);