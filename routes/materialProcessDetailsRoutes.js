const express = require('express');
const router = express.Router();
const MaterialProcessDetailsController = require('../controllers/materialProcessDetailsController');

// Define routes for MaterialProcessDetails
router.post('/', MaterialProcessDetailsController.createMaterialProcessDetail);
router.get('/', MaterialProcessDetailsController.getAllMaterialProcessDetails);
router.get('/:id', MaterialProcessDetailsController.getMaterialProcessDetail);
router.put('/:id', MaterialProcessDetailsController.updateMaterialProcessDetail);
router.delete('/:id', MaterialProcessDetailsController.deleteMaterialProcessDetail);

module.exports = router;
