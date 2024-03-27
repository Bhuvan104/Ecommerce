const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');
router.get('/getAllCategoriesWithProducts', categoryController.getAllCategoriesWithProducts);

// Create a new category
router.post('/',authMiddleware, categoryController.createCategory);

// Retrieve all categories
router.get('/getAllCategories',authMiddleware, categoryController.getAllCategories);

// Retrieve a single category by ID
router.get('/:id',authMiddleware, categoryController.getCategoryById);

// Update a category by ID
router.put('/:id',authMiddleware, categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id',authMiddleware, categoryController.deleteCategory);

//createCategoryAndProduct
router.post('/createCategoryAndProduct',authMiddleware, categoryController.createCategoryAndProduct);

//getAllCategoriesWithProducts

module.exports = router;
