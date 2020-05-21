const mongoose = require('mongoose');
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
            console.log(product);
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

    let discountId = req.params.id;
    Discount.findById(discountId, function (err, discount) {

        if(!discount)
            res.status(404).json({'error':'updating discount failed. discount not found'});
        else
            console.log('end ddate: ' + req.body.end_date);
        console.log('Discount percentage: ' + req.body.discount_percentage);

        discount.start_date = req.body.start_date;
        discount.end_date = req.body.end_date;
        discount.discount_percentage = req.body.discount_percentage;
        discount.save()
            .then(
                discountOb =>
                    res.status(200).json(discountOb))
            .catch(err => res.status(500).json({'error':'updating discount failed'}));

    });
};