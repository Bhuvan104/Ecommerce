'use strict';
const { MaterialProcessDetails } = require('../../models');
const Joi = require('joi');

// Define Joi schema for validation
const materialProcessDetailsSchema = Joi.object({
  material_process_id: Joi.number().integer().required(),
  material_id: Joi.number().integer().required(),
  used: Joi.string().max(100).required()
});

const MaterialProcessDetailsController = {
  // Create a new MaterialProcessDetail
  async createMaterialProcessDetail(req, res) {
    try {
      const { error } = materialProcessDetailsSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_process_id, material_id, used } = req.body;

      const newMaterialProcessDetail = await MaterialProcessDetails.create({ 
        material_process_id, 
        material_id, 
        used 
      });

      return res.status(201).json(newMaterialProcessDetail);
    } catch (error) {
      console.error('Error creating material process detail:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all MaterialProcessDetails
  async getAllMaterialProcessDetails(req, res) {
    try {
      const materialProcessDetails = await MaterialProcessDetails.findAll();
      return res.json(materialProcessDetails);
    } catch (error) {
      console.error('Error fetching material process details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get a MaterialProcessDetail by ID
  async getMaterialProcessDetail(req, res) {
    try {
      const { id } = req.params;
      const materialProcessDetail = await MaterialProcessDetails.findByPk(id);

      if (!materialProcessDetail) {
        return res.status(404).json({ error: 'MaterialProcessDetail not found.' });
      }

      return res.json(materialProcessDetail);
    } catch (error) {
      console.error('Error fetching material process detail:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update a MaterialProcessDetail by ID
  async updateMaterialProcessDetail(req, res) {
    try {
      const { id } = req.params;
      const { error } = materialProcessDetailsSchema.validate(req.body, { presence: 'optional' });
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_process_id, material_id, used } = req.body;

      const materialProcessDetail = await MaterialProcessDetails.findByPk(id);

      if (!materialProcessDetail) {
        return res.status(404).json({ error: 'MaterialProcessDetail not found.' });
      }

      await materialProcessDetail.update({ 
        material_process_id, 
        material_id, 
        used 
      });

      return res.json(materialProcessDetail);
    } catch (error) {
      console.error('Error updating material process detail:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a MaterialProcessDetail by ID
  async deleteMaterialProcessDetail(req, res) {
    try {
      const { id } = req.params;
      const materialProcessDetail = await MaterialProcessDetails.findByPk(id);

      if (!materialProcessDetail) {
        return res.status(404).json({ error: 'MaterialProcessDetail not found.' });
      }

      await materialProcessDetail.destroy();
      return res.json({ message: 'MaterialProcessDetail deleted successfully.' });
    } catch (error) {
      console.error('Error deleting material process detail:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = MaterialProcessDetailsController;
