const express = require('express');
const router = express.Router();
const MaterialProcessController = require('../controllers/material/materialProcessController');


// Create a new MaterialProcess
router.post('/',authMiddleware, MaterialProcessController.createMaterialProcess);

// Get all MaterialProcesses
router.get('/',authMiddleware, MaterialProcessController.getAllMaterialProcesses);

// Get a MaterialProcess by ID
router.get('/:id',authMiddleware, MaterialProcessController.getMaterialProcess);

// Update a MaterialProcess by ID
router.put('/:id',authMiddleware, MaterialProcessController.updateMaterialProcess);

// Delete a MaterialProcess by ID
router.delete('/:id',authMiddleware, MaterialProcessController.deleteMaterialProcess);

module.exports = router;
