const mongoose = require('mongoose');


let WishlistSchema = new mongoose.Schema({
    username: {
        type: String,
       
    }
    ,
    productname: {
        type: String,
        
    }
    ,
    productimage: {
        type: String,
    }
    ,
    price: {
        type: Number,

    }


});

module.exports = Wishlists = mongoose.model('Wishlist', WishlistSchema);
