const express = require('express');
const router = express.Router();
const materialInwardController = require('../controllers/material/materialInwardController');

router.post('/',authMiddleware, materialInwardController.createMaterialInward);
router.get('/',authMiddleware, materialInwardController.getAllMaterialInwards);
router.get('/:id',authMiddleware, materialInwardController.getMaterialInward);
router.delete('/:id',authMiddleware, materialInwardController.deleteMaterialInward);
router.put('/:id', authMiddleware,materialInwardController.updateMaterialInward);

module.exports = router;
