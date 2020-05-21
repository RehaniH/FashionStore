const express = require('express');
const router = express.Router();

const product_controller = require('../Controllers/product.controller');

//get all product details
router.get('/all', product_controller.getAllProducts);

//create new product
router.post('/create', product_controller.create_product);

//create new category
router.post('/category/create', product_controller.category_create);

//get product by id
router.get('/:id', product_controller.getProductsById);

//get products by category id
router.get('/category/:id', product_controller.getProductsByCategoryId);

//update a product
router.put('/update/:id', product_controller.update_product);

module.exports = router;