const express = require('express');
const router = express.Router();
const category_controller = require('../Controllers/category.conroller');

//create new category
router.post('/create', category_controller.category_create);

//create new category
router.get('/all', category_controller.getAllCategories);

module.exports = router;