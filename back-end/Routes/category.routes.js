const express = require('express');
const router = express.Router();

const Category = require("../Models/category.model");

router.post('/addCategory', (req, res) => {
    let category = new Category(req.body);
    category.save()
        .then(category => { res.status(200).json(category)})
        .catch(err => {
            res.status(400).send('adding new category failed');
        });
});

router.get('/allCategories', (req, res) => {
    Category.find()
        .then(category => res.json(category))
        .catch(err => res.status(404).json({ message: 'No Categories found' }));
});

router.get('/categoriesCount', (req, res) => {
    Category.find()
        .then(category => res.json(category.length))
        .catch(err => res.status(404).json({ message: 'No Categories found' }));
});

router.get('/:id', (req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(404).json({ message: 'No Category found' }));
});

router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body)
        .then(category => res.json({ message: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id, req.body)
        .then(category => res.json({ message: 'Category deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such Category' }));
});

module.exports = router;