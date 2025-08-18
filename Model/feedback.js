const mongoose = require("mongoose");


const userfeedback =   new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String

    },
   
     subject:{
        type:String

    },
     messages:{
        type:String

    }

}, { timestamps: true });

module.exports = mongoose.model('usersfeedback' , userfeedback);

     
