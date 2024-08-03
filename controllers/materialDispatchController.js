'use strict';
const { MaterialDispatch } = require('../models');
const Joi = require('joi');

// Define Joi schema for validation
const materialDispatchSchema = Joi.object({
  material_inward_id: Joi.number().integer().required(),
  received_qty: Joi.string().max(100).required(),
  assigned_type: Joi.string().max(100).required(),
  balance_qty: Joi.string().max(100).required(),
  completed_qty: Joi.string().max(100).required(),
  assigned_floor: Joi.string().max(100).required(),
  assigned_shift: Joi.string().max(100).required(),
  manager: Joi.string().max(100).required()
});

const MaterialDispatchController = {
  async createMaterialDispatch(req, res) {
    try {
      const { error } = materialDispatchSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const newMaterialDispatch = await MaterialDispatch.create(req.body);
      return res.status(201).json(newMaterialDispatch);
    } catch (error) {
      console.error('Error creating material dispatch:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAllMaterialDispatches(req, res) {
    try {
      const materialDispatches = await MaterialDispatch.findAll();
      return res.json(materialDispatches);
    } catch (error) {
      console.error('Error fetching material dispatches:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getMaterialDispatch(req, res) {
    try {
      const { id } = req.params;
      const materialDispatch = await MaterialDispatch.findByPk(id);

      if (!materialDispatch) {
        return res.status(404).json({ error: 'MaterialDispatch not found.' });
      }

      return res.json(materialDispatch);
    } catch (error) {
      console.error('Error fetching material dispatch:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateMaterialDispatch(req, res) {
    try {
      const { id } = req.params;
      const { error } = materialDispatchSchema.validate(req.body, { presence: 'optional' });
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const materialDispatch = await MaterialDispatch.findByPk(id);
      if (!materialDispatch) {
        return res.status(404).json({ error: 'MaterialDispatch not found.' });
      }

      await materialDispatch.update(req.body);
      return res.json(materialDispatch);
    } catch (error) {
      console.error('Error updating material dispatch:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteMaterialDispatch(req, res) {
    try {
      const { id } = req.params;
      const materialDispatch = await MaterialDispatch.findByPk(id);

      if (!materialDispatch) {
        return res.status(404).json({ error: 'MaterialDispatch not found.' });
      }

      await materialDispatch.destroy();
      return res.json({ message: 'MaterialDispatch deleted successfully.' });
    } catch (error) {
      console.error('Error deleting material dispatch:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = MaterialDispatchController;
