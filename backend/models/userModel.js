const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    verified: {
        type: Boolean,
        default: false
    },
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

/*
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    
    this.password = await bcrypt.hash(this.password, saltRounds);
});
*/

userSchema.methods.createJwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES });
};

//static signup method
userSchema.statics.signup = async function(email, username, password, fileURL, next) {

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
userSchema.statics.login = async function(email, password) {

    //console.log(email);

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    //find out if email already exists or username already taken during signup
    const user = await this.findOne({ email }).select("+password");

    if(!user){
        throw Error('No account exists with this email');
    }

    //console.log(password);
    //console.log(user.password);

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw Error('Incorrect Password');
    }

    return user;

}

module.exports = mongoose.model('User', userSchema);