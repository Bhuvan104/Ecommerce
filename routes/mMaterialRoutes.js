const express = require('express');
const MaterialController = require('../controllers/material/mMaterialController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',authMiddleware, MaterialController.createMaterial);
router.get('/', authMiddleware,MaterialController.getAllMaterials);
router.get('/materials/:id',authMiddleware, MaterialController.getMaterial);
router.put('/materials/:id',authMiddleware, MaterialController.updateMaterial);
router.delete('/materials/:id',authMiddleware, MaterialController.deleteMaterial);

module.exports = router;
