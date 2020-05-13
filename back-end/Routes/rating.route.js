const express = require('express');
const router = express.Router();


const Ratings= require('../Models/rating.model');


router.get('/test', (req, res) => res.send('ratings route testing!'));


router.get('/', (req, res) => {
    Ratings.find()
        .then(ratings => res.json(ratings))
        .catch(err => res.status(404).json({ noratingfound: 'No ratings found' }));
});

router.get('/:id', (req, res) => {
    Ratings.findById(req.params.id)
        .then(rating => res.json(rating))
        .catch(err => res.status(404).json({ noratingfound: 'No ratings found' }));
});


router.post('/add', (req, res) => {

    Ratings.create(req.body)
        .then(rating => res.json({ msg: 'rating added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add rating' }));
});


router.put('/:id', (req, res) => {
    Ratings.findByIdAndUpdate(req.params.id, req.body)
        .then(rating => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});


router.delete('/:id', (req, res) => {
    Ratings.findByIdAndDelete(req.params.id, req.body)
        .then(rating => res.json({ mgs: 'rating deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a rating' }));
});

module.exports = router;
