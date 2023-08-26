const User = require('../models/userModel')

//login user
const loginUser = async (req, res) => {
    res.json({message: 'Login User'});
};

//signup user
const signupUser = async (req, res) => {

    const {email, username, password} = req.body

    res.json({message: 'Signup User'});
};

module.exports = { signupUser, loginUser };