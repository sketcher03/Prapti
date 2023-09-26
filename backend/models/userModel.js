const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utilities/ErrorHandler');
const saltRounds = 10;

const userSchema = new Schema({
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
    name: {
        type: String,
    },
    phoneNumber: {
        type: Number
    },
    billingAddresses: [
        {
            country: {
                type: String
            },
            city: {
                type: String
            },
            address: {
                type: String
            },
            postCode: {
                type: Number
            }
        }
    ],
    role: {
        type: String,
        default: "user"
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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    
    this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

/*
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES });
};
*/

//static signup method
userSchema.statics.signup = async function(email, username, password, fileURL, next) {

    //validation using validator
    if(!email || !username || !password) {
        return next(new ErrorHandler('One or few fields are empty', 400));
    }

    if (!validator.isEmail(email)) {
        return next(new ErrorHandler('Email is not valid', 400));
    }

    if(!validator.isStrongPassword(password))
    {
        return next(new ErrorHandler('Password not strong enough', 400));
    }
    
    //find out if email already exists or username already taken during signup
    const emailExists = await this.findOne({ email });
    const userExists = await this.findOne({ username });

    if (emailExists) {
        return next(new ErrorHandler('Email Already in Use', 400));
    }

    if(userExists){
        return next(new ErrorHandler('Username Already Taken', 400));
    }

    //password hashing with salt
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const user = {
        email: email,
        username: username,
        password: hash,
        profilePic: fileURL
    };

    return user;
}

//static login method
userSchema.statics.login = async function(email, password) {

    //validation using validator
    if(!email || !password) {
        throw Error('Some fields are empty');
    }

    //find out if email already exists or username already taken during signup
    const user = await this.findOne({ email });

    if(!user){
        throw Error('Incorrect Email');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw Error('Incorrect Password');
    }

    return user;

}

module.exports = mongoose.model('User', userSchema);