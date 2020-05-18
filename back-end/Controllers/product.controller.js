const express = require('express');
const Product = require('../Models/product.model');
const Category = require('../Models/category.model');
const Discount = require('../Models/discount.model');

exports.category_create = function (req, res) {
    let category = new Category(req.body);
    category.save()
        .then(category => { res.status(200).json(category)})
        .catch(err => {
            res.status(400).send('adding new category failed');
        });
};


exports.getAllCategories = function(req, res) {

    Category.find()
        .exec(function (err, category) {
            if(err){
                res.status(404).json({'error_msg': 'not found'})
            }else{
                res.json(category)
            }
        });
};

exports.create_product = function (req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json(product);
        })
        .catch(err=>{
            res.status(400).send('adding new product failed');
        });


};

exports.update_product = function (req, res) {

    Product.findById(req.params.id, function (err, product) {
        if(!product)
            res.status(404).send('data is not found');
        else
            product.name = req.body.name;
            product.description = req.body.description;
            product.manufacturer_price = req.body.manufacturer_price;
            product.retail_price = req.body.retail_price;
            product.quantity = req.body.quantity;
            product.category = req.body.category;
           // product.product_image = url + '/items/' + req.file.filename;
            product.save()
                .then(product =>{
                res.json(product);
                })
                .catch(err =>{
                    res.status(400).send("update not possible");
                })


    });

};

exports.getAllProducts = function(req, res) {

    Product.find()
        .populate('category')
        .exec(function (err, products) {
        if(err){
            res.status(404).json({'error_msg': 'not found'})
        }else{
            res.json(products)
        }
    });
};

exports.getProductsByCategoryId = function(req, res) {

    Product.find({'category':req.params.id}).exec(function (err, products) {
        if(err){
            res.status(404).json({'error_msg': 'not found'})
        }else{
            res.json(products)
        }
    });
};

exports.getProductsById = function(req, res) {

    let id = req.params.id;
    Product.findById(id)
        .populate('category')
        .exec(function (err, product) {
            if(err){
                console.log(err)
            }else{
                res.json(product)
            }
        });
};

exports.create_new_product = function (req, res) {

    const url = req.protocol + '://' + req.get('host');
    let product = new Product({
        ref_no: req.body.ref_no,
        name:req.body.product_name,
        description: req.body.description,
        total_quantity: req.body.total_quantity,
        manufacturer_price: req.body.manufacturer_price,
        retail_price: req.body.retail_price,
        category: req.body.category,
        product_image: url + '/items/' + req.file.filename

    });
    
    product.save()
        .then(product => {
            res.status(200).json(product);
        })
        .catch(err=>{
            res.status(400).send('adding new product failed');
        });
};

exports.product_details = function (req, res) {

    let discount;
    Product
        .find({'ref_no':req.params.ref_no})
        .populate('category')
        .select('name retail_price description product_image total_quantity category')
        .exec(function (err, product) {
            if(err)
                res.status(400).json({'error':'getting product details failed'});
            else
                Discount.find({'product_id': product._id}).exec(function (err, discountObj) {

                    if(!discountObj)
                        discount = 0;
                    else
                        discount = discountObj;

                });
                product.discount = discount;
                res.status(200).json(product);
        })

};
