const createError = require('http-errors');
const Product = require('../models/product.model');

module.exports.existsProduct = (req, res, next) => {
    Product.findById(req.params.postId)
    .then(product => {
        if(!product){
            throw createError(404, 'Product not found')
        } else {
            next();
        }
    })
    .catch(next)
}