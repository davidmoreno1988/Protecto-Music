const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = Schema({
    number: Number,
    name: String,
    duration: String,
    file: String,
    _id_album: {type: Schema.objectId, ref:"Album"}
});

module.exports = mongoose.model("song", songSchema);