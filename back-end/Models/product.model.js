const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let product = new Schema({
    name:{type:String},
    description:{type: String}
});

module.exports = Product = mongoose.model('product', product);

