var prd=require('../Models/prroducts');
//var Cart=require('../models/cart');
var mongoose=require('mongoose');
var atc=require('../Models/addtocart');
express=require('express');
router=express.Router();

router.route('/add').post((req,res,next) => {
    const p=[new prd({imagePath:'https://s7d2.scene7.com/is/image/academy/20412544?$d-plp-top-categories$',
        title:'çheque shirt',
        description:'blue color cheque linen shirt available in two sizes (M,L)',
        price:10}),

    new prd({
        imagePath:'https://cf.shopee.ph/file/02764bc18791185ac00cc4ae9bc8126f',
        title:'mens short',
        description:'tri colour shorts available sizes (XS,S,M,L)',
        price:40
    }),

        new prd({
            imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4oeBvX21NlDBvpJtQfNqEMNZuVQNke8eWfRda_21YSsQ2GdeZ&usqp=CAU',
            title:'plain T-shirt',
            description:'black color T- shirt available in two sizes (L,XL)',
            price:100
        }),
        ];
    for(var i=0;i<p.length;i++) {
        p[i].save().then(() => res.json('product added')).catch(err => res.status(400).json('error' + err));
    }
})

router.route('/pr').get((req,res)=> {
prd.find({}).exec((error,data)=>{
    if(error){
        return next(error)
    }
    else{
        res.json(data)
    }
})

})

router.route('/addcart').post((req,res,next)=>{
    console.log(req.body.id);
    atc.create(req.body,(err,data)=>{
        if(err){
            return next(err)
        }
        else{
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/username/:uname').get((req,res)=>{
    var items={username:req.params.uname, status :false}
    atc.find(items,(error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data)
        }
    })
})

router.route('/updatestate').put((req,res)=> {
    for(var i=0;i<req.body.length;i++){
        atc.findByIdAndUpdate(req.body[i]._id,{
            $set : {
                status:true
            }
        }).then(()=> res.sendStatus(200)).catch((err)=>console.error(err))
    }
})


router.route('/update-student/:id/:newqnty').put((req, res, next) => {
    atc.findByIdAndUpdate(req.params.id, {
        $set: {
            quantity : req.params.newqnty
        }
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('quantity updated successfully !')
        }
    })
})


router.route('/delete-item/:id').delete((req, res, next) => {
    atc.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data

            })
        }
    })
})


/*router.get('/add-to-cart/:id',function(req,res){
    var productId=req.params.id;
    var cart=new Cart(req.session.cart ? req.session.cart :{});

    prd.findById(productId,function (err,product) {
        if(err){
           // return res.redirect('/');
            console.log('item not added!');
        }
        cart.add(product,product.id);
        req.session.cart=cart;
        console.log(req.session.cart);
        res.redirect('/');

    })
});
*/



module.exports=router;