const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter your Email Address"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please enter a Username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your Password"],
        minLength: [4, "Password too short!"],
        select: false
    },
    name: {
        type: String,
        required: [true, "Please enter Your Name"]
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
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
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
userSchema.statics.signup = async function(email, username, password) {

    //validation using validator
    if(!email || !username || !password) {
        throw Error('One or few fields are empty');
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }

    if(!validator.isStrongPassword(password))
    {
        throw Error('Password not strong enough')
    }
    
    //find out if email already exists or username already taken during signup
    const emailExists = await this.findOne({ email });
    const userExists = await this.findOne({ username });

    if(emailExists){
        throw Error('Email Already in Use');
    }

    if(userExists){
        throw Error('Username already taken');
    }

    //password hashing with salt
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, username, password: hash });

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