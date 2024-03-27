const { images } = require('../models');
const fs = require('fs');
const path = require('path');

const imagesController = {
  getAllImages: async (req, res) => {
    try {
      const allImages = await images.findAll();
      res.json(allImages);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  createImage: async (req, res) => {
    const { name, description} = req.body;
    const image = req.files ? req.files[0].filename : null; // Get uploaded image filename
    console.log(req.body);
    console.log("image", image);
    try {
      const newImage = await images.create({ name, description, image });
      res.status(201).json(newImage);
    } catch (error) {
      console.error('Error creating image:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  deleteImage: async (req, res) => {
    const { id } = req.params;
    try {
      const imageToDelete = await images.findByPk(id);
      if (!imageToDelete) {
        return res.status(404).json({ error: 'Image not found' });
      }

      // Get the filename of the image
      const imagePath = path.join(__dirname, '..', 'uploads', imageToDelete.image);

      // Check if the file exists, then delete it
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      // Delete the image record from the database
      await imageToDelete.destroy();
      
      res.status(200).json({ message: 'Image and related file deleted successfully' });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  deleteAllImages: async (req, res) => {
    try {
      // Delete all records from the images table
      await images.destroy({
        where: {}, // No conditions, so it will delete all records
        truncate: true // Reset auto-increment primary key if any
      });
      console.log('All images deleted successfully');
      res.status(200).json({ message: 'All images deleted successfully' });
    } catch (error) {
      console.error('Error deleting images:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = imagesController;
