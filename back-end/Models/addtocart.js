var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var atc=new Schema({
    id:{type:String,required:true},
    title:{type:String,required:true},
    username:{type:String,required:true},
    quantity:{type:String,required:false},
    price:{type:Number,required:false},
    status:{type:Boolean,required:false}
},{
    collection: 'addtocart'
});
module.exports=mongoose.model('addtocart',atc);