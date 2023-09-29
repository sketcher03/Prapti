const User = require('../models/userModel');
const Token = require("../models/token");
const express = require('express');
const crypto = require("crypto");
const sendMail = require('../utilities/sendMail');
const Joi = require("joi");

const router = express.Router();

//login route
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).send({ message: "Invalid Email" });
        }

        const validPass = user.comparePassword(password);

        if (!validPass) {
            return res.status(400).send({ message: "Invalid Password" });
        }

        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });

            if (!token) {
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
                );

                return res.status(400).send({ message: `Please Check your Email: ${user.email} to activate your account` });
            }
        }

        //token creation
        const token = user.getJwtToken();

        //username extraction
        const username = user.username;

        res.status(200).json({email, username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;