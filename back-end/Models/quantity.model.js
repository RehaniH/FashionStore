const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quantity = new Schema({
    product_id : {type: Schema.Types.ObjectId, ref:'Product'},
    size:{type:String},
    quantity:{type: Number, required:true}
});
