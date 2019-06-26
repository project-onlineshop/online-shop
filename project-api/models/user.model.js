const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;


const userSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    email:{
        type: String,
        required: 'Email is required',
        unique: true,
        lowercase: true,
        trim: true,
        match: [EMAIL_PATTERN, 'Invalid email pattern']
    },
    password:{
        type: String,
        required: 'Password is required',
        match: [PASSWORD_PATTERN, 'Password is required']
    },
    category:{
        type: String,
        required: 'Category is required',
        enum: constants.category
    },
    image:{
        type: String,
    },
    price:{
        type: Number,
        required: 'Price is required'
    },
    description:{
        type: String,
        required: 'Description is required'
    }

})

const User = mongoose.model('User', userSchema);
module.exports = User;