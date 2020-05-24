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

    },
    makeunique: {
        type: String,
        unique: true 
    },
    ref_no: {
        type: Number
    }


});

module.exports = Wishlists = mongoose.model('Wishlist', WishlistSchema);
