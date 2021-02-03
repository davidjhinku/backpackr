const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateItineraryItemInput(data) {

    let errors = {};

    data.itemName = validText(data.itemName) ? data.itemName : "";
    data.category = validText(data.category) ? data.category : "";
    data.description = validText(data.description) ? data.description : "";

    if (Validator.isEmpty(data.itemName))
        errors.itemName = "The itinerary item needs a name";

    if (Validator.isEmpty(data.category))
        errors.category = "Category is required";

    if (Validator.isEmpty(data.description))
        errors.description = "Description is required";

    if (Validator.isEmpty(data.address))
        errors.address = "Address is required";

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

}