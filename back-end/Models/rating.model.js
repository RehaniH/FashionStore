const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

let RatingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
    ,
    email: {
        type: String,
        required: true
    },
    ratings: {
        type: Number

    },
    comment: {
        type: String,

    }
    ,
    date_of: {
        type: Date
    }

});

module.exports = Ratings = mongoose.model('Rating', RatingSchema);
