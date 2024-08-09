'use strict';
const { MaterialFiling } = require('../../models');
const Joi = require('joi');

// Define Joi schema for validation
const materialFilingSchema = Joi.object({
  material_inward_id: Joi.number().integer().required(),
  received_qty: Joi.string().max(100).required(),
  assigned_type: Joi.string().max(100).required(),
  balance_qty: Joi.string().max(100).required(),
  completed_qty: Joi.string().max(100).required(),
  assigned_floor: Joi.string().max(100).required(),
  assigned_shift: Joi.string().max(100).required(),
  manager: Joi.string().max(100).required()
});

const MaterialFilingController = {
  // Create a new MaterialFiling
  async createMaterialFiling(req, res) {
    try {
      const { error } = materialFilingSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_inward_id, received_qty, assigned_type, balance_qty, completed_qty, assigned_floor, assigned_shift, manager } = req.body;

      const newMaterialFiling = await MaterialFiling.create({ 
        material_inward_id, 
        received_qty, 
        assigned_type, 
        balance_qty, 
        completed_qty, 
        assigned_floor, 
        assigned_shift, 
        manager 
      });

      return res.status(201).json(newMaterialFiling);
    } catch (error) {
      console.error('Error creating material filing:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all MaterialFilings
  async getAllMaterialFilings(req, res) {
    try {
      const materialFilings = await MaterialFiling.findAll();
      return res.json(materialFilings);
    } catch (error) {
      console.error('Error fetching material filings:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get a MaterialFiling by ID
  async getMaterialFiling(req, res) {
    try {
      const { id } = req.params;
      const materialFiling = await MaterialFiling.findByPk(id);

      if (!materialFiling) {
        return res.status(404).json({ error: 'MaterialFiling not found.' });
      }

      return res.json(materialFiling);
    } catch (error) {
      console.error('Error fetching material filing:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update a MaterialFiling by ID
  async updateMaterialFiling(req, res) {
    try {
      const { id } = req.params;
      const { error } = materialFilingSchema.validate(req.body, { presence: 'optional' });
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_inward_id, received_qty, assigned_type, balance_qty, completed_qty, assigned_floor, assigned_shift, manager } = req.body;

      const materialFiling = await MaterialFiling.findByPk(id);

      if (!materialFiling) {
        return res.status(404).json({ error: 'MaterialFiling not found.' });
      }

      await materialFiling.update({ 
        material_inward_id, 
        received_qty, 
        assigned_type, 
        balance_qty, 
        completed_qty, 
        assigned_floor, 
        assigned_shift, 
        manager 
      });

      return res.json(materialFiling);
    } catch (error) {
      console.error('Error updating material filing:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a MaterialFiling by ID
  async deleteMaterialFiling(req, res) {
    try {
      const { id } = req.params;
      const materialFiling = await MaterialFiling.findByPk(id);

      if (!materialFiling) {
        return res.status(404).json({ error: 'MaterialFiling not found.' });
      }

      await materialFiling.destroy();
      return res.json({ message: 'MaterialFiling deleted successfully.' });
    } catch (error) {
      console.error('Error deleting material filing:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = MaterialFilingController;
