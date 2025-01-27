const express = require('express');
const router = express.Router();
const { jwtAuthenticate } = require('../middlewares/jwtMiddleware');
const { isAdmin, isVendor } = require('../middlewares/roleMiddleware');
const { createProduct, getProducts, searchProducts } = require('../controllers/productController');

// Admin route - can create products
router.post('/products', jwtAuthenticate, isAdmin, createProduct);

// Vendor route - can create their own products
router.post('/vendor/products', jwtAuthenticate, isVendor, createProduct); // Vendor can create their own product

// Get all products (admins can see everything, vendors can see their own)
router.get('/products', jwtAuthenticate, getProducts);

// Search route
router.get('/search', jwtAuthenticate, searchProducts);

module.exports = router;
