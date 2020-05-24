const express = require('express');
const Product = require('../Models/product.model');

exports.create_new_product = function (req, res) {

    console.log(req.file);
    const url = req.protocol + '://' + req.get('host');
    let product = new Product({
        ref_no: req.body.product_id,
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

exports.update_product = function (req, res) {

    const url = req.protocol + '://' + req.get('host');
    let query = {_id: req.params.id};
    let fileName;

    if(req.file !== undefined){
        fileName = url + '/items/' + req.file.filename;
    }else{
        Product.findById(req.params.id).exec(function (err, product) {
            fileName = product.product_image;
        });
    }
    Product.findOneAndUpdate(query,
        {name :req.body.product_name,
            ref_no: req.body.product_id,
            description :req.body.description,
            manufacturer_price : req.body.manufacturer_price,
            retail_price: req.body.retail_price,
            total_quantity: req.body.total_quantity,
            category : req.body.category,
            product_image :fileName,},
        {new: true}, function (err, product) {

            if(err){
                res.status(400).send("updating product failed");
            }else
                res.json(product);


    });

};

exports.product_details = function (req, res) {

    Product
        .findOne({'ref_no':req.params.ref_no})
        .populate('category discount')
        .select('name ref_no retail_price description product_image total_quantity category discount')
        .exec(function (err, product) {
            if(err)
                res.status(400).json({'error':'getting product details failed'});
            else
                res.status(200).json(product);
        });

};

exports.getAllProducts = function(req, res) {

    Product.find()
        .populate('category discount')
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
        .populate('category discount')
        .exec(function (err, product) {
            if(err){
                console.log(err)
            }else{
                res.json(product)
            }
        });
};

exports.deleteProductById = function (req, res) {

    Product.findByIdAndDelete(req.params.id, req.body)
        .then(products => res.json({ message: 'Product deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such Product' }))
};

