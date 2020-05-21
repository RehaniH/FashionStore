var mongoose=require('mongoose');
express=require('express');
router=express.Router();
var pymt=require('../models/paymentM');

router.route('/payment').post((req,res)=>{
    console.log(req.body.id);
    pymt.create(req.body,(err,data)=>{
        if(err){
            return next(err)
        }
        else{
            console.log(data)
            res.json(data)
        }
    })
});
module.exports=router;