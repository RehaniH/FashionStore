const express = require('express');
const router = express.Router();


const Wishlists= require('../Models/wishlist.model');


router.get('/test', (req, res) => res.send('Wishlists route testing!'));


router.get('/', (req, res) => {
    Wishlists.find()
        .then(wish => res.json(wish))
        .catch(err => res.status(404).json({ noWishlistsfound: 'No Wishlists found' }));
});

router.get('/:id', (req, res) => {
    Wishlists.findById(req.params.id)
        .then(wish => res.json(wish))
        .catch(err => res.status(404).json({ noratingfound: 'No Wishlists found' }));
});

router.get('/get/:username', (req, res) => {
    Wishlists.find({ 'username':  req.params.username})
        .then(wish => res.json(wish))
        .catch(err => res.status(404).json({ noratingfound: 'No username found' }));
});


router.post('/add', (req, res) => {

    Wishlists.create(req.body)
        .then(wish => res.json({ msg: 'Wishlists added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add Wishlists' }));
});



router.delete('/:id', (req, res) => {
    Wishlists.findByIdAndDelete(req.params.id, req.body)
        .then(wish => res.json({ mgs: 'Wishlists deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a Wishlists' }));
});

module.exports = router;
