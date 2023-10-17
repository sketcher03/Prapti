const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const Token = require("../models/token");
const express = require('express');
const crypto = require("crypto");
const sendMail = require('../utilities/sendMail');
const saveCookie = require('../utilities/cookie');
const saveAdminCookie = require('../utilities/cookieAdmin');
const requireAuth = require('../middleware/requireAuthentication');

const router = express.Router();

//user login route
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

//admin login route
router.post('/admin/login', async (req, res) => {

    const { email, password } = req.body;
    console.log(email);

    try {
        const admin = await Admin.login(email, password);

        console.log(admin.verified);

        if (!admin.verified) {
            throw Error("Please wait for verification");
        }

        /*res.status(200).send({admin, message: "login successful"})*/
        saveAdminCookie(admin, res, 201);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }

});

//save user information
router.get('/saveuser', requireAuth, async (req, res, next) => {
    
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            console.log("cant find user")
            throw Error("User does not Exist");
        }

        res.status(200).send({ user, success: true });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

//save admin information
router.get('/saveadmin', requireAuth, async (req, res, next) => {
    
    try {
        const admin = await admin.findById(req.user.id);

        if (!admin) {
            console.log("cant find user")
            throw Error("User does not Exist");
        }

        res.status(200).send({ admin, success: true });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

//user logout route
router.post('/logout', async (req, res) => {

    try{

        res.clearCookie("user");
        //console.log(req.cookies.user);
        res.status(200).send({ message: "User logged out successfully" });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

//admin logout route
router.post('/logout', async (req, res) => {

    try{

        res.clearCookie("admin");
        //console.log(req.cookies.user);
        res.status(200).send({ message: "Admin logged out successfully" });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }

});


module.exports = router;