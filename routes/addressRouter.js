const express = require('express');
const addressController = require('../controllers/addressController');

const router = express.Router();
router.get('/', addressController.getUserAddresses);
router.post('/', addressController.createAddress);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);
router.get('/:userId/addresses', addressController.getUserAddressesWithInclude);

// Route to get user addresses without including associated addresses
router.get('/:userId/addresses-without-include', addressController.getUserAddressesWithoutInclude);
module.exports = router;
