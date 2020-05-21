const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let product = new Schema({
    name:{type:String},
    description:{type: String},
    price: {type:Number},
    total_quantity:{type:Number},
    category:{ type: Schema.Types.ObjectId, ref:'Category'}
});

module.exports = Product = mongoose.model('Product', product);

