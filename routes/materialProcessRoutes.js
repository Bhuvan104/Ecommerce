const express = require('express');
const router = express.Router();
const MaterialProcessController = require('../controllers/materialProcessController');


// Create a new MaterialProcess
router.post('/', MaterialProcessController.createMaterialProcess);

// Get all MaterialProcesses
router.get('/', MaterialProcessController.getAllMaterialProcesses);

// Get a MaterialProcess by ID
router.get('/:id', MaterialProcessController.getMaterialProcess);

// Update a MaterialProcess by ID
router.put('/:id', MaterialProcessController.updateMaterialProcess);

// Delete a MaterialProcess by ID
router.delete('/:id', MaterialProcessController.deleteMaterialProcess);

module.exports = router;
