const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pRouter = express.Router();
const PORT = 4000;
const path = require('path');
const passport = require("passport");



//products routes
const product = require('./Routes/product.routes');
const ratings=require('./Routes/rating.route');
const wishlists=require('./Routes/wishlist.route');
const ps=require('./Routes/product-seeder');
const pay=require('./Routes/payment-seeder');

const discount = require('./Routes/discount.routes');

//user routes
const users = require("./Routes/user.routes");

//category routes
const category = require("./Routes/category.routes");

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
app.use(bodyParser.urlencoded({extended: false}));//remove only for testing purpose
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello world!'));
//app.use(bodyParser.urlencoded({extended: false}));//remove only for testing purpose

//Routing configured
app.use('/products', product);
app.use('/ratings',ratings);
app.use('/wishlists',wishlists);
app.use('/',ps);
app.use('/pymt',pay);
app.use('/discount', discount);

app.use('/items', express.static(path.join(__dirname ,'items')));
//Routing configured for category router
app.use('/category', category);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./Config/passport")(passport);
// Routes
app.use("/api/users", users);

app.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT);
});

module.exports = pRouter;


