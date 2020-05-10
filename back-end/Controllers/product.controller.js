const express = require('express');
const Product = require('../Models/product.model');
const Category = require('../Models/category.model')

exports.category_create = function (req, res) {
    let category = new Category(req.body);
    category.save()
        .then(category => { res.status(200).json(category)})
        .catch(err => {
            res.status(400).send('adding new category failed');
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

            product.save()
                .then(product =>{
                res.json('product updated');
                })
                .catch(err =>{
                    res.status(400).send("update not possible");
                })


    });

};

exports.getAllProducts = function(req, res) {

    Product.find().populate('category').exec(function (err, products) {
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
