const createError = require('http-errors');
const Product = require('../models/product.model');

module.exports.list = (req, res, next) => {
    Product.find()
    .sort({ createdAt: -1 })
    .then(products => res.json(products))
}

module.exports.create = (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    });
    product.save()
    .then(product => res.status(201).json(product))
    .catch(next)
}

module.exports.get = (req, res, next) => {
    Product.findById(req.params.id)
    .populate('products')
    .then(product => {
        if(!product) {
            throw createError(404, 'Product not found')
        } else {
            res.json(product)
        }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(product => {
        if(!product) {
            throw createError(404, 'Product not found')
        } else {
            res.json(product)
        }
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
    .then(product => {
        if(!product) {
            throw createError(404, 'Product not found')
        } else {
            res.status(204).json();
        }
    })
    .catch(next)
}