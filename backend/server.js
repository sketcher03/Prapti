require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const requestRoutes = require('./routes/requests');
const userRoutes = require('./routes/user');

//express app setup
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//route
app.use('/api/requests', requestRoutes);
app.use('/api/user', userRoutes);

//connect to DB
mongoose.connect(process.env.MONG_URI)
    .then((result) => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB and Listening on port ", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });