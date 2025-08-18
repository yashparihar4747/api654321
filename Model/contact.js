const mongoose = require("mongoose");

const userContact =   new mongoose.Schema({
    email:{
        type:String

    },
    password:{
        type:String

    },
     name:{
        type:String

    },
     phone:{
        type:String

    },
     subject:{
        type:String

    },
     message:{
        type:String

    }

});

const usersContact = mongoose.model('userscontact' , userContact);
module.exports = usersContact;
     