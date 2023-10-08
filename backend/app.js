require('dotenv').config({
    path:"./config/.env"
});

const express = require('express');

//express app setup
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

//middleware
app.use(express.json());

app.use(cookieParser());
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/api", express.static("uploads"));

const requestRoutes = require('./routes/requests');
const authRoutes = require('./controllers/authController');
const userRoutes = require('./controllers/userController');
const adminRoutes = require('./controllers/adminController');

//route
app.use('/api/requests', requestRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;