// routes/inventoryDetailsRoutes.js
const express = require('express');
const InventoryDetailsController = require('../controllers/inventoryDetailsController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
// Define routes
router.post('/', authMiddleware,InventoryDetailsController.createInventoryDetail);
router.get('/',authMiddleware, InventoryDetailsController.getAllInventoryDetails);
router.get('/:id',authMiddleware, InventoryDetailsController.getInventoryDetail);
router.put('/:id',authMiddleware, InventoryDetailsController.updateInventoryDetail);
router.delete('/:id',authMiddleware, InventoryDetailsController.deleteInventoryDetail);

module.exports = router;
