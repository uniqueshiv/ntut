const mongoose = require('mongoose');
const { Schema} = mongoose;

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    icon:{
        type:String,
    },
    color:{
        type:String,
    }
})

module.exports.Category = mongoose.model('Category',categorySchema);