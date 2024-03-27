const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
//productwithcategories
router.get('/productwithcategories',authMiddleware, productController.productsWithCategories);

// Create a new product
router.post('/',authMiddleware, productController.createProduct);

// Get a product by ID
router.get('/:productId',authMiddleware, productController.getProduct);

// Update a product
router.put('/:productId',authMiddleware, productController.updateProduct);

// Get all products
router.get('/',authMiddleware, productController.getAllProducts);

// Delete a product
router.delete('/:productId',authMiddleware, productController.deleteProduct);


module.exports = router;
