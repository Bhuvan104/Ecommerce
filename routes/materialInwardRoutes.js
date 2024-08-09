const express = require('express');
const router = express.Router();
const materialInwardController = require('../controllers/material/materialInwardController');

router.post('/', materialInwardController.createMaterialInward);
router.get('/', materialInwardController.getAllMaterialInwards);
router.get('/:id', materialInwardController.getMaterialInward);
router.delete('/:id', materialInwardController.deleteMaterialInward);
router.put('/:id', materialInwardController.updateMaterialInward);

module.exports = router;
