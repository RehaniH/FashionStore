const express = require('express');
const multer = require('multer');
const router = express.Router();
const product_controller = require('../Controllers/product.controller');

const storage = multer.diskStorage({
    destination: function (req, file, callB) {
        callB(null, './items/');
    },
    filename:function (req, file, callB) {
        callB(null, "PRD" + Date.now() + "_"+ file.originalname);
    }
});
const filterFiles = (req, file, callB) =>{
    if(file.mimeType === 'img/jpeg' || file.mimeType === 'img/png' || file.mimeType === 'img/jpg'){
        callB(null, true);
    }else{
        callB(null, false);
    }
};
const upload = multer({storage:storage, limits:{
        fileSize:1024*1024
    }});//folder in which all uploads are saved into



//get all product details
router.get('/all', product_controller.getAllProducts);

//create new product removed cause it doesnt involve saving images
//router.post('/create', product_controller.create_product);

//create new category
router.post('/category/create', product_controller.category_create);

//create new category
router.get('/category/all', product_controller.getAllCategories);

//get product by id
router.get('/:id', product_controller.getProductsById);

//get product by id
router.get('/ref-no/:ref_no', product_controller.product_details);

//get products by category id
router.get('/category/:id', product_controller.getProductsByCategoryId);

//update a product
router.put('/update/:id', product_controller.update_product);

//uploading products with images
router.post('/upload', upload.single('product_img'), product_controller.create_new_product);

module.exports = router;