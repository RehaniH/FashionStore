const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let discount = new Schema({
    discount_percentage:{type:Number},
    start_date:{type:Date},
    end_date:{type:Date},
    product:{type: Schema.Types.ObjectId, ref:'Product'}
});

module.exports = mongoose.model('Discount', discount);