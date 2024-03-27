const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Route for user login
router.post('/', AuthController.login);

module.exports = router;
