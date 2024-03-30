const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
//getUsers_add_orders
router.get('/addresses-orders',  userController.getUsers_add_orders);
// getUsers_add_orders_product
router.get('/addresses-orders-product',  userController.getUsers_add_orders_product);
//createUserWithOrdersAndProducts
router.post('/addresses-orders-product',  userController.createUserWithOrdersAndProducts)
//createAddressForUser
router.post('/:userId/address', userController.createAddressForUser);
// Create a new user
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
// Get a user by ID
router.get('/:userId',authMiddleware, userController.getUser);

// Delete a user by ID
router.delete('/:userId',authMiddleware, userController.deleteUser);

// Update a user by ID
router.put('/:userId',authMiddleware, userController.updateUser);


// Route to create an order for a user
router.post('/:userId/orders', userController.createOrderForUser);

module.exports = router;
