const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    street:{
        type:String,
        default:""
    },
    apartment:{
        type:String,
        default:""
    },
    zip:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    country:{
        type:String,
        default:""
    }
    
})

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
userSchema.set('toJSON',{virtuals:true})


module.exports.User = mongoose.model("User",userSchema);
