const mongoose = require('mongoose');
const schema = mongoose.Schema;

let cartSchema = new schema({
    date:{
        type:Date,
        default:Date.now,
    },
    item: [
        {
            itemName:String,
            itemPrice:Number,
            quantity:Number
        }
    ]
});

const cartDetails = ((module.exports = mongoose.model('cartDetails',cartSchema)))