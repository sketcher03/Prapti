const ErrorHandler = require("../utilities/ErrorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        const message = `Resources not found with this id... Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if (err.code === 11000) {
        const message = `Duplicate Key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
        const message = "URL Invalid";
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = "URL Expired";
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}