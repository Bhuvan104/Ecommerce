const express = require('express');
const router = express.Router();
const PurchaseDetailsController = require('../controllers/purchaseDetailsController');

// Create a new PurchaseDetails
router.post('/', PurchaseDetailsController.createPurchaseDetails);

// Get all PurchaseDetails
router.get('/', PurchaseDetailsController.getAllPurchaseDetails);

// Get a PurchaseDetails by ID
router.get('/:id', PurchaseDetailsController.getPurchaseDetails);

// Update a PurchaseDetails by ID
router.put('/:id', PurchaseDetailsController.updatePurchaseDetails);

// Delete a PurchaseDetails by ID
router.delete('/:id', PurchaseDetailsController.deletePurchaseDetails);

module.exports = router;
