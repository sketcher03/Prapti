const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [4, "Password too short!"],
        select: false
    },
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    verified: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordTime: Date
});



adminSchema.methods.createJwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES });
};

//static signup method
adminSchema.statics.signup = async function(email, username, password, fileURL, next) {

    //console.log(email);

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    if(!validator.isStrongPassword(password))
    {
        throw Error('Password is not Strong Enough');
    }
    
    //find out if email already exists or username already taken during signup
    const emailExists = await this.findOne({ email });
    const userExists = await this.findOne({ username });

    if (emailExists) {
        throw Error('Email Already in Use');
    }

    if(userExists){
        throw Error('Username already taken');
    }

    //password hashing with salt
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    //console.log(hash);

    const user = {
        email: email,
        username: username,
        password: hash,
        profilePic: fileURL
    };

    const newUser = await this.create(user);

    return newUser;
}

//static login method
adminSchema.statics.login = async function(email, password) {

    //console.log(email);

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    //find out if email already exists or username already taken during signup
    const admin = await this.findOne({ email }).select("+password");

    if(!admin){
        throw Error('No account exists with this email');
    }


    const match = await bcrypt.compare(password, admin.password);

    if(!match) {
        throw Error('Incorrect Password');
    }

    return admin;

}
module.exports = mongoose.model('Admin', adminSchema);