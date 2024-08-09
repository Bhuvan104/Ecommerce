const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client/clientController');
// If you have any middleware for authentication or authorization, import it here
const authMiddleware = require('../middleware/authMiddleware');

// Create a new client
router.post('/', clientController.createClient);

// Get all clients
router.get('/', clientController.getAllClients);

// Get a single client by ID
router.get('/:clientId',authMiddleware, clientController.getClient);

// Delete a client by ID
router.delete('/:clientId',authMiddleware, clientController.deleteClient);

// Update a client by ID
router.put('/:clientId',authMiddleware, clientController.updateClient);

module.exports = router;
