const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTripInput(data){

    let errors = {};

    data.destination = validText(data.destinaton) ? data.destination : "";
    data.tripName = validText(data.tripName) ? data.tripName : "";

    if (Validator.isEmpty(data.destination))
        errors.destination = "You need to enter a destination";

    if (Validator.isEmpty(data.tripName))
        errors.tripName = "You need to give your trip a name";

    debugger

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}