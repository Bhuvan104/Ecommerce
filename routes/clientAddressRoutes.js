const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const clientAddressController = require('../controllers/client/clientAddressController');

router.post('/', authMiddleware,clientAddressController.createClientAddress);
router.get('/',authMiddleware, clientAddressController.getAllClientAddresses);
router.get('/:clientAddressId',authMiddleware, clientAddressController.getClientAddress);
router.delete('/:clientAddressId',authMiddleware, clientAddressController.deleteClientAddress);
router.put('/:clientAddressId',authMiddleware, clientAddressController.updateClientAddress);

module.exports = router;
