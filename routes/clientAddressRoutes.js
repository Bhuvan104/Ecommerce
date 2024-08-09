const express = require('express');
const router = express.Router();
const clientAddressController = require('../controllers/client/clientAddressController');

router.post('/', clientAddressController.createClientAddress);
router.get('/', clientAddressController.getAllClientAddresses);
router.get('/:clientAddressId', clientAddressController.getClientAddress);
router.delete('/:clientAddressId', clientAddressController.deleteClientAddress);
router.put('/:clientAddressId', clientAddressController.updateClientAddress);

module.exports = router;
