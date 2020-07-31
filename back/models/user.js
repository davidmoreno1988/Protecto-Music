const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    image: String
});

module.exports = mongoose.model("user", userSchema);