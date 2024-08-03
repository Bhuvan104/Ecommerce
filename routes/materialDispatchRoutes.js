const express = require('express');
const router = express.Router();
const MaterialDispatchController = require('../controllers/materialDispatchController');

// Routes for MaterialDispatch
router.post('/', MaterialDispatchController.createMaterialDispatch);
router.get('/', MaterialDispatchController.getAllMaterialDispatches);
router.get('/:id', MaterialDispatchController.getMaterialDispatch);
router.put('/:id', MaterialDispatchController.updateMaterialDispatch);
router.delete('/:id', MaterialDispatchController.deleteMaterialDispatch);

module.exports = router;
