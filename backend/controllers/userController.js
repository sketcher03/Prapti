const { response } = require('express');
const User = require('../models/userModel');
const Token = require("../models/token");
const jwt = require('jsonwebtoken');
const express = require('express');
const { upload } = require("../multer");
const crypto = require("crypto");
const catchAsyncErrors = require("../middleware/asyncErrors");

const path = require("path");
const sendMail = require('../utilities/sendMail');

const router = express.Router();

const createToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES });
}

//signup route
router.post('/signup', upload.single("file"), async (req, res, next) => {

    const { email, username, password } = req.body;

    //const profilePic = fileURL;

    try {
        const filename = req.file.filename;
        const fileURL = path.join(filename);

        const user = await User.signup(email, username, password, fileURL, next);

        //token creation
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();

        const url = `${process.env.BASE_URL}/user/${user._id}/verify/${token.token}`;

        await sendMail(
            user.email,
            "Account Activation",
            `Hello ${user.username}, please click on the link to activate your account: ${url}`,
        )

        res.status(201).send({ message: `Please Check your Email: ${user.email} to activate your account` });
            
        //username extraction
        //const username1 = user.username;

        //res.status(200).json({email, username1, activationtoken, success: true});
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//activation 
router.get("/:id/verify/:token", catchAsyncErrors(async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(400).send({ message: 'Invalid Link' });
        }

        const token = await Token.findOne({
            userId: user._id,
			token: req.params.token,
        });

        if (!token) {
            return res.status(400).send({ message: 'Invalid Link' });
        }

        await User.updateOne({ _id: user._id, verified: true });
        await token.remove();

        res.status(200).send({ message: 'Email Verified Successfully' });
    }
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}));

module.exports = router;