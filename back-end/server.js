const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pRouter = express.Router();
const PORT = 4000;

//products routes
const product = require('./Routes/product.routes');
const ratings=require('./Routes/rating.route');
const wishlists=require('./Routes/wishlist.route');



let db_url = 'mongodb+srv://web-service:groupassign@project-owtzo.mongodb.net/fashion_store?retryWrites=true&w=majority';

mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.Promise = global.Promise;

const connection = mongoose.connection;
connection.once('open', function () {
    console.log('MongoDB connection established successfully');
});
connection.on('error', function () {
    console.log('MongoDB connection error.')
});

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello world!'));
//app.use(bodyParser.urlencoded({extended: false}));//remove only for testing purpose

//Routing configured
app.use('/products', product);
app.use('/ratings',ratings);
app.use('/wishlists',wishlists);

app.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT);
});

module.exports = pRouter;


