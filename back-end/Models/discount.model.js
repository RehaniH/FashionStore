const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let discount = new Schema({
    discount_percentage:{type:Number},
    discount_price:{type:Number},
    discount:{type:Number},
    start_date:{type:Date},
    end_date:{type:Date}
});

module.exports = Discount =  mongoose.model('Discount', discount);