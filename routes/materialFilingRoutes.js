const express = require('express');
const router = express.Router();
const MaterialFilingController = require('../controllers/material/materialFilingController');
const authMiddleware = require('../middleware/authMiddleware');
// Routes for MaterialFiling
router.post('/',authMiddleware, MaterialFilingController.createMaterialFiling);
router.get('/',authMiddleware, MaterialFilingController.getAllMaterialFilings);
router.get('/:id',authMiddleware, MaterialFilingController.getMaterialFiling);
router.put('/:id',authMiddleware, MaterialFilingController.updateMaterialFiling);
router.delete('/:id',authMiddleware, MaterialFilingController.deleteMaterialFiling);

module.exports = router;
