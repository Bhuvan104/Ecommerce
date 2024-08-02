const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getUser);

// Delete a user by ID
router.delete('/:userId',userController.deleteUser);
router.put('/:userId', userController.updateUser);

module.exports = router;
