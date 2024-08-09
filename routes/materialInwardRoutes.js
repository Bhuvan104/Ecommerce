const express = require('express');
const router = express.Router();

const materialInwardController = require('../controllers/material/materialInwardController');
const upload = require('../config/multerConfig.js');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/',upload.single('dc_image'), materialInwardController.createMaterialInward);
router.get('/',authMiddleware, materialInwardController.getAllMaterialInwards);
router.get('/:id',authMiddleware, materialInwardController.getMaterialInward);
router.delete('/:id',authMiddleware, materialInwardController.deleteMaterialInward);
router.put('/:id', authMiddleware,upload.single('dc_image'),materialInwardController.updateMaterialInward);

module.exports = router;
