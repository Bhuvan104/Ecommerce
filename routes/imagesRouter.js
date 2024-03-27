const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

// GET all images
router.get('/', imagesController.getAllImages);

// POST create a new image
router.post('/', imagesController.createImage);
router.delete('/:id', imagesController.deleteImage);
router.delete('/', imagesController.deleteAllImages);
module.exports = router;
