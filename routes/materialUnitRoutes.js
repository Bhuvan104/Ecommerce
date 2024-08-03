const express = require('express');
const MaterialUnitController = require('../controllers/materialUnitController');
const router = express.Router();



// Define routes
router.post('/',MaterialUnitController.createMaterialUnit);
router.get('/', MaterialUnitController.getAllMaterialUnits);
router.get('/:id', MaterialUnitController.getMaterialUnit);
router.put('/:id', MaterialUnitController.updateMaterialUnit);
router.delete('/:id', MaterialUnitController.deleteMaterialUnit);

module.exports = router;