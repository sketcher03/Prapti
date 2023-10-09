const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const express = require('express');
const { upload } = require("../multer");

const path = require("path");


const router = express.Router();

//signup route
router.post('/signup', upload.single("file"), async (req, res, next) => {

    const {email, fname, lname, phoneNumber, username, password} = req.body;
    //console.log(email);

    try {
        const filename = req.file.filename;
        const fileURL = path.join(filename);
        console.log(fileURL);

        const admin = await Admin.signup(email, fname, lname, phoneNumber, username, password, fileURL);

        res.status(201).send({ message: "Please wait for validation" , success: true, admin});
            
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;