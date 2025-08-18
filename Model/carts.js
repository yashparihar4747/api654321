const mongoose = require("mongoose");

const userContact = new mongoose.Schema({
    placename: { type: String },
    placeimage: { type: String }
}, { timestamps: true }); // ✅ add timestamps

module.exports = mongoose.model('userscarts', userContact);
