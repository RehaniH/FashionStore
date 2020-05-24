var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var pymt=new Schema({

    address:{type:String,required:true},
    region:{type:String,required:true},
    tel:{type:Number,required:true},
    name:{type:String,required:true},
    number:{type:String,required:true},
    cvc:{type:Number,required:true},
    expiry:{type:String,required:true},
    price:{type:Number,required:true}
});

module.exports=mongoose.model('paymentM',pymt);