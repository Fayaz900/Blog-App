const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password required']
    }
},{timestamps:true})

const userModel = mongoose.model("User",UserSchema);

module.exports = userModel;