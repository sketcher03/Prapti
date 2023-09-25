const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONG_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        console.log("Connected MongoDB to server: ", data.connection.host);
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = connectDB;