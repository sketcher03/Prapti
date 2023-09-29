const User = require('../models/userModel');
const Token = require("../models/token");
const express = require('express');
const crypto = require("crypto");
const sendMail = require('../utilities/sendMail');

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

        //token creation
        const token = user.getJwtToken();

        //username extraction
        const username = user.username;

        res.status(200).send({ email: email, username: username, token: token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }

});

module.exports = router;