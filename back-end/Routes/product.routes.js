const express = require('express');
const router = express.Router();

const product_controller = require('../Controllers/product.controller');

router.get('/test', product_controller.test);
router.post('/create', product_controller.create_product);
router.route('/get').post(product_controller.create_product);
router.route('/get-all').get(product_controller.getAllProducts);

module.exports = router;