const Validator = require("validator");
const validText = require("./valid-text");

// Validates email and password from login requests.
module.exports = function validateCommentInput(data) {
    let errors = {};

    data.comment = validText(data.comment) ? data.comment : "";

    if (Validator.isEmpty(data.destination))
        errors.destination = "You need to enter a comment";

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}