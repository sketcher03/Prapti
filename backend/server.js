require('dotenv').config();

const express = require('express');

//express app setup
const app = express();

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to the app'});
});

//listen for requests
app.listen(process.env.PORT, () => {
    console.log("Listening on port ", process.env.PORT);
});