const mongoose = require('mongoose');
const schema = mongoose.Schema;


let cartSchema = new schema({
    date:{
        type:String,
    },
    time:{
        type:String,
    },
    paid:{
        type:String,
    },
    details: [
        {
            itemName:String,
            itemPrice:Number,
            quantity:Number
        }
    ]
});

const cartDetails = ((module.exports = mongoose.model('cartDetails',cartSchema)))