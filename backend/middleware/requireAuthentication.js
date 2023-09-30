const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    
    //verify authentication
    const token = req.cookies.user.token;

    console.log(req.cookies.user.token);

    if(!token) {
        return res.status(401).send({ message: 'You are not logged in' });
    }

    try{
        const { _id } = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({ _id }).select('_id');

        next();
    }
    catch (error) {
        console.log(error);

        res.status(401).send({ message: 'Unauthorized Request' });
    }

}
 
module.exports = requireAuth;