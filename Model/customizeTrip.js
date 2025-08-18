const mongoose = require("mongoose");

const userCustomize =   new mongoose.Schema({
     name:{
        type:String

    },
    email:{
        type:String

    },
    country:{
        type:String

    },
      phone:{
        type:String

    },

    adults:{
        type: Number,
        required: true,
         min: 1 
    },
    children:{
        type: Number,
        required: true,
         min: 0
    },
    startDate:{
        type: Date,
        required: true
       
    },
   

    hotelRequired:{
        type:Boolean,
        default: false
    },
    carRequired:{
        type:Boolean,
        default: false
    },
     message:{
        type:String,
        default: ""

    },
   
   
     requestTime: {
        type: Date,
        default: Date.now
    }
    

}, { timestamps: true });

module.exports = mongoose.model('userscustomizeTrip' , userCustomize);
