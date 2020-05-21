var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var pymt=new Schema({

    owner:{type:String,required:true},
    card:{type:String,required:true},
    subtotal:{type:Number,required:true}
});

module.exports=mongoose.model('paymentM',pymt);