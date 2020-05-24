const Discount = require('../Models/discount.model');
const Product = require('../Models/product.model');

exports.create_discount = function (req, res) {

    let discount = new Discount({
        discount: req.body.discount,
        discount_percentage:req.body.discount_percentage,
        discount_price: req.body.discount_price,
        start_date:req.body.start_date,
        end_date:req.body.end_date
    });

    let  product;

    Product.findById(req.body.product_id, function (err, foundProduct) {
        product = foundProduct
    });

    discount.save()
        .then(discount =>{
            product.discount = discount._id;
            product.save().then(prd =>
                console.log('product ' +  prd)
            ).catch(err => {
                res.status(500).send('Adding discount to product failed');
            });
            res.status(201).json(discount)
        })
        .catch(err =>
            res.status(500).send("Adding new discount failed"));

};

exports.update_discount = function (req, res) {

    let query = {_id : req.params.id};

    Discount.findOneAndUpdate(query, {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        discount_percentage: req.body.discount_percentage,
        discount: req.body.discount,
        discount_price: req.body.discount_price
    }, function (err, discount) {

        if(err){
            res.status(500).send("updating discount failed.");
        }else
            res.json(discount);
    }).then().catch(err => console.log(err));

};
