const express = require('express');
const router = express.Router();
const PurchaseDetailsController = require('../controllers/purchaseDetailsController');

// Create a new PurchaseDetails
router.post('/',authMiddleware, PurchaseDetailsController.createPurchaseDetails);

// Get all PurchaseDetails
router.get('/',authMiddleware, PurchaseDetailsController.getAllPurchaseDetails);

// Get a PurchaseDetails by ID
router.get('/:id',authMiddleware, PurchaseDetailsController.getPurchaseDetails);

// Update a PurchaseDetails by ID
router.put('/:id',authMiddleware, PurchaseDetailsController.updatePurchaseDetails);

// Delete a PurchaseDetails by ID
router.delete('/:id',authMiddleware, PurchaseDetailsController.deletePurchaseDetails);

module.exports = router;
