const Category = require('../Models/category.model');

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