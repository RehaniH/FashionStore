const mongoose = require('mongoose');


let WishlistSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    }
    ,
    price: {
        type: Number,

    }


});

module.exports = Wishlists = mongoose.model('Wishlist', WishlistSchema);
