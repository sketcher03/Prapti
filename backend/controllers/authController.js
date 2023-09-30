const User = require('../models/userModel');
const Token = require("../models/token");
const express = require('express');
const crypto = require("crypto");
const sendMail = require('../utilities/sendMail');
const saveCookie = require('../utilities/cookie');
const requireAuth = require('../middleware/requireAuthentication');

const router = express.Router();

//login route
router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    //console.log(email);

    try {
        const user = await User.login(email, password);

        console.log(user.verified);

        if (user.verified === false) {
            const token = await Token.findOne({ userId: user._id });

            if (!token) {
                //token creation
                const token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save();

                const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;

                await sendMail(
                    user.email,
                    "Account Activation",
                    `Hello ${user.username}, please click on the link to activate your account: ${url}`,
                );

                throw Error(`Please Check your Email: ${user.email} to activate your account`);
            }
        }

        saveCookie(user, res, 201);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }

});

//save user information
router.get('/saveuser', requireAuth, async (req, res, next) => {
    
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            throw Error("User does not Exist");
        }

        res.status(200).send({ user, success: true });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

module.exports = router;