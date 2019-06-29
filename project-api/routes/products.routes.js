const express = require('express');
const router = express.Router();
const products = require('../controllers/product.controller');
const secure = require('../middlewares/secure.mid');

router.get('/', secure.isAuthenticated, products.list);
router.post('/', secure.isAuthenticated, products.create);
router.get('/:id', secure.isAuthenticated, products.get);
router.get('/:id', secure.isAuthenticated, products.delete);
router.get('/:id', secure.isAuthenticated, products.update);

module.exports = router;