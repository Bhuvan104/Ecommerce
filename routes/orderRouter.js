// orderRouter.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route for creating a new order
router.post('/orders', orderController.createOrder);
router.get('/usersWithOrders', orderController.getUsersWithOrders);
// Export the router
module.exports = router;
