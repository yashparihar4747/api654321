const mongoose = require("mongoose");

const userLogin = new mongoose.Schema({
    email: String,
    password: String,
    loginTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('userLogins', userLogin);
