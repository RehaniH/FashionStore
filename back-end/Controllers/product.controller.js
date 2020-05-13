const express = require('express');
const Product = require('../Models/product.model');

exports.test = function (req, res) {
    res.send('Greetings from test controller');
};


exports.create_product = function (req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'todo': 'product added successfully'})
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

            product.save().then(product =>{
                res.json('todo updated');
            })
                .catch(err =>{
                    res.status(400).send("update not possible");
                })


    });

};

exports.getAllProducts = function(req, res) {

    Product.find(function (err, products) {
        if(err){
            console.log(err)
        }else{
            res.json(products)
        }
    })
};

exports.getProductsById = function(req, res) {

    let id = req.params.id;
    Product.findById(id, function (err, product) {
        if(err){
            console.log(err)
        }else{
            res.json(product)
        }
    })
};
