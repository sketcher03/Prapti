const { response } = require('express');
const User = require('../models/userModel');
const Token = require("../models/token");
const jwt = require('jsonwebtoken');
const express = require('express');
const { upload } = require("../multer");

const path = require("path");
const sendMail = require('../utilities/sendMail');

const router = express.Router();

const createToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES });
}

//signup route
router.post('/signup', upload.single("file"), async (req, res, next) => {

    const { email, username, password } = req.body;
    //console.log(email);

    try {
        const filename = req.file.filename;
        const fileURL = path.join(filename);

        const user = await User.signup(email, username, password, fileURL, next);
        //console.log("error here");

        //token creation
        const token = await Token.createToken(user._id);

        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;

        await sendMail(
            user.email,
            "Account Activation",
            `Hello ${user.username}, please click on the link to activate your account: ${url}`,
        )

        res.status(201).send({ message: `Please Check your Email: ${user.email} to activate your account` });
            
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//activation 
router.get("/:id/verify/:token", async (req, res) => {
    try {
        
        //console.log("Error Here")

        const token = await Token.findOne({
            userId: req.params.id,
			token: req.params.token,
        });

        if (!token) {
            return res.status(401).send({ message: 'Link Expired' });
        }

        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(401).send({ message: 'No such user registered' });
        }

        if (user.verified) {
            return res.status(401).send({ message: 'Account already verified!' });
        }

        const filter = { _id: user._id };

        await User.updateOne(filter, { verified: true });
        //await token.remove();

        res.status(200).send({ message: 'Email Verified Successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error. Please try again later." });
    }
});

//update user route
router.put('/signup/:id', upload.single("file"), async (req, res, next) => {

    const { name, display_name, description, phoneNumber, email, username, talents } = req.body;
    const { id } = req.params;
    //console.log(email);

    try {
        const filename = req.file.filename;
        const fileURL = path.join(filename);

        const updateUser = {
            id: id,
            name: name,
            display_name: display_name,
            description: description,
            phoneNumber: phoneNumber,
            email: email,
            username: username,
            talents: talents,
            profilePic: fileURL,
            role: "user100"
        }

        const user = await User.update( updateUser, next);
        //console.log("error here");

        res.status(200).send({ user, success: true, message: "Your information has been saved Successfully!" });
            
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;