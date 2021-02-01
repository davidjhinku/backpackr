const validText = str => {
    // Makes sure that the data is a string, and that it isn't just a bunch of white spaces.
    return typeof str === "string" && str.trim().length > 0;
}

module.exports = validText;