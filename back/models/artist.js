const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    _id_artist: {type: Schema.objectId, ref:"artist"}
});

module.exports = mongoose.model("artist", artistSchema);