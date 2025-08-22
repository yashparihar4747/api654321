const mongoose = require("mongoose");
const Counter = require("./counter");

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
    role: {
        type:String,
        default: "customer"

    },
     registerTime: {
        type: Date,
        default: Date.now
    }
    

});
user.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.userId = `userid-${counter.seq}`;
  }
  next();
});

const users = mongoose.model('users' , user);
module.exports = users;
     