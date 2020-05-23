const mongoose = require('mongoose');


let WishlistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
    ,
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
