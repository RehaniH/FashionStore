const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pRouter = express.Router();
const PORT = 4000;

//products routes
const product = require('./Routes/product.routes');


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

app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));//remove only for testing purpose

//Routing configured
app.use('/products', product);

app.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT);
});

module.exports = pRouter;


