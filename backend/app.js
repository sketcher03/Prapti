require('dotenv').config({
    path:"./config/.env"
});

const express = require('express');

//express app setup
const app = express();

const ErrorHandler = require('./utilities/ErrorHandler');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//middleware
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({ useTempFiles: true }));

//error handling
app.use(ErrorHandler);

module.exports = app;