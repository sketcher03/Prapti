const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validator = require('validator');
const bcrypt = require('bcrypt');
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
        required: true
    }
});

//static signup method
userSchema.statics.signup = async function(email, username, password) {

    //validation using validator
    if(!email || !username || !password) {
        throw Error('Some fields are empty');
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

module.exports = mongoose.model('User', userSchema);