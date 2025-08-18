const mongoose = require("mongoose");

const user =   new mongoose.Schema({
    email:{
        type:String

    },
    password:{
        type:String

    },

    conformPassword:{
        type:String
    },
     name:{
        type:String

    },
     phone:{
        type:String

    },
     registerTime: {
        type: Date,
        default: Date.now
    }
    

});

const users = mongoose.model('users' , user);
module.exports = users;
     