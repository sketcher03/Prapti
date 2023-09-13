const { response } = require('express');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

//login user
const loginUser = async (req, res) => {

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

};

//signup user
const signupUser = async (req, res) => {

    const { email, username, password } = req.body;

    try {
        const user = await User.signup(email, username, password);

        //token creation
        const token = createToken(user._id);

        //username extraction
        const username1 = user.username;

        res.status(200).json({email, username1, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = { signupUser, loginUser };