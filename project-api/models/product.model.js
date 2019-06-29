const mongoose = require('mongoose');
const constants = require('../constants');
const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: 'Name is required'
    },
    category: {
        type: String,
        required: 'Category is required',
        enum: constants.category
    },
    image: {
        type: String,
        match: [URL_PATTERN, 'Invalid avatar URL pattern'],
        required: 'Image is required'
    },
    price: {
        type: Number,
        required: 'Price is required'
    },
    description: {
        type: String,
        required: 'Description is required',
        maxlength: 250
    }
}, {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = doc._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;
            }
        }
    });


const Product = mongoose.model('Product', userSchema);
module.exports = Product;