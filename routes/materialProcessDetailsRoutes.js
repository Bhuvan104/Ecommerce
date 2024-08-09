const express = require('express');
const router = express.Router();
const MaterialProcessDetailsController = require('../controllers/material/materialProcessDetailsController');
const authMiddleware = require('../middleware/authMiddleware');
// Define routes for MaterialProcessDetails
router.post('/',authMiddleware, MaterialProcessDetailsController.createMaterialProcessDetail);
router.get('/', authMiddleware,MaterialProcessDetailsController.getAllMaterialProcessDetails);
router.get('/:id',authMiddleware, MaterialProcessDetailsController.getMaterialProcessDetail);
router.put('/:id',authMiddleware, MaterialProcessDetailsController.updateMaterialProcessDetail);
router.delete('/:id',authMiddleware, MaterialProcessDetailsController.deleteMaterialProcessDetail);

module.exports = router;
