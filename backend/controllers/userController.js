const { response } = require('express');
const User = require('../models/userModel')

//login user
const loginUser = async (req, res) => {
    res.json({message: 'Login User'});
};

//signup user
const signupUser = async (req, res) => {

    const { email, username, password } = req.body;

    try {
        const user = await User.signup(email, username, password);

        res.status(200).json({email, user});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = { signupUser, loginUser };