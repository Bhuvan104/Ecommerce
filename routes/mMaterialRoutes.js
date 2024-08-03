const express = require('express');
const MaterialController = require('../controllers/mMaterialController');

const router = express.Router();

router.post('/', MaterialController.createMaterial);
router.get('/', MaterialController.getAllMaterials);
router.get('/materials/:id', MaterialController.getMaterial);
router.put('/materials/:id', MaterialController.updateMaterial);
router.delete('/materials/:id', MaterialController.deleteMaterial);

module.exports = router;
