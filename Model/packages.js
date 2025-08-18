const mongoose = require("mongoose");

const usersPackage =   new mongoose.Schema({
    name: {
        type: String,   
    },
   
    attractions: {
        type: [String],
    },
    pickup: {
        type: Boolean,
    },
    duration: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    rating: {
        type: Number,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    }


}, { timestamps: true });

const usersPackages = mongoose.model('userspackages' , usersPackage);
module.exports = usersPackages;
     