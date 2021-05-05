const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    pic:{
      type:String,
      default:"https://res.cloudinary.com/dandykdwo/image/upload/v1620196960/default_ej1hvu.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User",userSchema);