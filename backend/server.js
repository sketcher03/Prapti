const app = require("./app");
const connectDB = require("./db/database");


const requestRoutes = require('./routes/requests');
const userRoutes = require('./routes/user');

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down Server to handle uncaught exception`)

    server.close(() => {
        process.exit(1);
    });
});

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//route
app.use('/api/requests', requestRoutes);
app.use('/api/user', userRoutes);

//connect database
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Running and Listening on port http://localhost:${process.env.PORT}`);
});


/*
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

*/

process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
})