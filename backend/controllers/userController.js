const { response } = require('express');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const express = require('express');
const { upload } = require("../multer");
//const fs = require("fs");
const catchAsyncErrors = require("../middleware/asyncErrors");

const path = require("path");
const ErrorHandler = require('../utilities/ErrorHandler');
const sendMail = require('../utilities/sendMail');
const sendToken = require('../utilities/jwtTokens');

const router = express.Router();

const createToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES });
}

//login route
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        //token creation
        const token = createToken(user._id);

        //username extraction
        const username = user.username;

        res.status(200).json({email, username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

});

//signup route
router.post('/signup', upload.single("file"), async (req, res, next) => {

    const { email, username, password } = req.body;

    //const profilePic = fileURL;

    try {
        const filename = req.file.filename;
        const fileURL = path.join(filename);

        const user = await User.signup(email, username, password, fileURL, next);

        //token creation
        const activationtoken = createToken(user);

        const activationURL = `http://localhost:5173/activation/${activationtoken}`;

        try {
            await sendMail({
                email: user.email,
                subject: "Account Activation",
                message: `Hello ${user.username}, please click on the link to activate your account: ${activationURL}`,
            })

            res.status(201).json({ success: true, message: `Please Check your Email: ${user.email} to activate your account` });
            
        } catch {
            return next(new ErrorHandler(error.message, 500));
        }

        //username extraction
        const username1 = user.username;

        //res.status(200).json({email, username1, activationtoken, success: true});
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

//activation 
router.post("/activation", catchAsyncErrors(async (req, res, next) => {
    try {
        const { activationtoken } = req.body;

        const newUser = jwt.verify(activationtoken, process.env.SECRET);

        if (!newUser) {
            return next(new ErrorHandler("Invalid Token", 400));
        }

        const { email, username, password, profilePic } = newUser;

        const user = await User.create({ email, username, password, profilePic });

        sendToken(user, 201, res)
    }
    catch (error) {
        
    }
}));

module.exports = router;