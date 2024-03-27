const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/:userId/address', userController.createAddressForUser);
// Create a new user
router.post('/',authMiddleware, userController.createUser);
router.get('/',authMiddleware, userController.getAllUsers);
// Get a user by ID
router.get('/:userId',authMiddleware, userController.getUser);

// Delete a user by ID
router.delete('/:userId',authMiddleware, userController.deleteUser);

// Update a user by ID
router.put('/:userId',authMiddleware, userController.updateUser);

// Route to create an order for a user
router.post('/:userId/orders', userController.createOrderForUser);

module.exports = router;
