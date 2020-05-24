const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let product = new Schema({
    ref_no:{type:Number, required: true},
    name:{type:String},
    description:{type: String},
    manufacturer_price:{type:Number},
    retail_price: {type:Number},
    total_quantity:{type:Number},
    category:{ type: Schema.Types.ObjectId, ref:'Category', required:true},
    product_image: {type:String},
    discount: {type: Schema.Types.ObjectId, ref:'Discount'}
});

module.exports = Product = mongoose.model('Product', product);

