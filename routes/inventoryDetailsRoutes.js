// routes/inventoryDetailsRoutes.js
const express = require('express');
const InventoryDetailsController = require('../controllers/inventoryDetailsController');
const router = express.Router();

// Define routes
router.post('/', InventoryDetailsController.createInventoryDetail);
router.get('/', InventoryDetailsController.getAllInventoryDetails);
router.get('/:id', InventoryDetailsController.getInventoryDetail);
router.put('/:id', InventoryDetailsController.updateInventoryDetail);
router.delete('/:id', InventoryDetailsController.deleteInventoryDetail);

module.exports = router;
