const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

let RatingSchema = new mongoose.Schema({
    username: {
        type: String,
      
    }
    ,
    email: {
        type: String,
       
    },
    ratings: {
        type: Number

    },
    comment: {
        type: String,

    },
    date_of: {
        type: Date
    },
    product_id:{
        type: String
    }
   

});

module.exports = Ratings = mongoose.model('Rating', RatingSchema);
