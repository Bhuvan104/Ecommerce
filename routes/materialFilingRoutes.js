const express = require('express');
const router = express.Router();
const MaterialFilingController = require('../controllers/materialFilingController');

// Routes for MaterialFiling
router.post('/', MaterialFilingController.createMaterialFiling);
router.get('/', MaterialFilingController.getAllMaterialFilings);
router.get('/:id', MaterialFilingController.getMaterialFiling);
router.put('/:id', MaterialFilingController.updateMaterialFiling);
router.delete('/:id', MaterialFilingController.deleteMaterialFiling);

module.exports = router;
