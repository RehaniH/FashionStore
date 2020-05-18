const express = require('express');
const discount_controller = require('../Controllers/discount.controller');
const router = express.Router();

//creates new discount for a specific product
router.post('/create', discount_controller.create_discount);

//creates new discount for a specific product
router.put('/:id', discount_controller.update_discount);

module.exports = router;