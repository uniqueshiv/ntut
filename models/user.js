const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
    name:String,
    image:String,
    stock:{
        type:Number,
        required:true
    }
})


module.exports.user = mongoose.model("User",userSchema);
