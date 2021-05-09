const mongoose = require('mongoose');
const schema = mongoose.Schema;

let menuSchema = new schema({
    itemName:{
        type:String,
        required:true
    },
    itemPrice:{
        type:Number,
        required:true
    }
});

const menuDetails = ((module.exports = mongoose.model('menuDetails',menuSchema)))