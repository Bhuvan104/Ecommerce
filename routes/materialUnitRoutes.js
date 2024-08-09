const express = require('express');
const MaterialUnitController = require('../controllers/material/materialUnitController');
const router = express.Router();



// Define routes
router.post('/',authMiddleware,MaterialUnitController.createMaterialUnit);
router.get('/',authMiddleware, MaterialUnitController.getAllMaterialUnits);
router.get('/:id',authMiddleware, MaterialUnitController.getMaterialUnit);
router.put('/:id',authMiddleware, MaterialUnitController.updateMaterialUnit);
router.delete('/:id',authMiddleware, MaterialUnitController.deleteMaterialUnit);

module.exports = router;