const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const requireAdminAuth = async (req, res, next) => {

    try {
        //verify authentication
        //console.log("error here");
        //console.log(req.cookies);

        const token = req.cookies.admin;

        if(!token) {
            return res.status(401).send({ message: 'You are not logged in' });
        }

        const { _id } = jwt.verify(token, process.env.SECRET);

        req.admin = await Admin.findOne({ _id }).select('_id');

        next();
    }
    catch (error) {
        //console.log(error);

        res.status(401).send({ message: 'Unauthorized Request' });
    }

}
 
module.exports = requireAdminAuth;