const express = require('express');
const router = express.Router();
const MaterialDispatchController = require('../controllers/material/materialDispatchController');

// Routes for MaterialDispatch
router.post('/',authMiddleware, MaterialDispatchController.createMaterialDispatch);
router.get('/',authMiddleware, MaterialDispatchController.getAllMaterialDispatches);
router.get('/:id',authMiddleware, MaterialDispatchController.getMaterialDispatch);
router.put('/:id',authMiddleware, MaterialDispatchController.updateMaterialDispatch);
router.delete('/:id',authMiddleware, MaterialDispatchController.deleteMaterialDispatch);

module.exports = router;
