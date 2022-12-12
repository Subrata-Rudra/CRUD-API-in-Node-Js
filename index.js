const express = require('express');
const bodyparser = require("body-parser");
const app = express();
const productRoute = require("./routes/product");
const connection = require("./connection");

app.use(bodyparser.urlencoded({extended: "ture"})); //this is used to parse the body element send from client's or user's browser by the client or user
app.use(express.json());
app.use('/product', productRoute); //this will pass the route to "productRoute" when "/product" is called


module.exports = app;