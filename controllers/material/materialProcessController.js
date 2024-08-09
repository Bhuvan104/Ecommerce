'use strict';
const { MaterialProcess } = require('../../models');

const Joi = require('joi');

// Define Joi schema for validation
const materialProcessSchema = Joi.object({
  material_inward_id: Joi.number().integer().required(),
  received_qty: Joi.string().max(100).required(),
  assigned_type: Joi.string().max(100).required(),
  balance_qty: Joi.string().max(100).required(),
  completed_qty: Joi.string().max(100).required(),
  assigned_floor: Joi.string().max(100).required(),
  assigned_shift: Joi.string().max(100).required(),
  manager: Joi.string().max(100).required()
});

const MaterialProcessController = {
  // Create a new MaterialProcess
  async createMaterialProcess(req, res) {
    try {
      const { error } = materialProcessSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_inward_id, received_qty, assigned_type, balance_qty, completed_qty, assigned_floor, assigned_shift, manager } = req.body;

      const newMaterialProcess = await MaterialProcess.create({ 
        material_inward_id, 
        received_qty, 
        assigned_type, 
        balance_qty, 
        completed_qty, 
        assigned_floor, 
        assigned_shift, 
        manager 
      });

      return res.status(201).json(newMaterialProcess);
    } catch (error) {
      console.error('Error creating material process:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all MaterialProcesses
  async getAllMaterialProcesses(req, res) {
    try {
      const materialProcesses = await MaterialProcess.findAll();
      return res.json(materialProcesses);
    } catch (error) {
      console.error('Error fetching material processes:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get a MaterialProcess by ID
  async getMaterialProcess(req, res) {
    try {
      const { id } = req.params;
      const materialProcess = await MaterialProcess.findByPk(id);

      if (!materialProcess) {
        return res.status(404).json({ error: 'MaterialProcess not found.' });
      }

      return res.json(materialProcess);
    } catch (error) {
      console.error('Error fetching material process:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update a MaterialProcess by ID
  async updateMaterialProcess(req, res) {
    try {
      const { id } = req.params;
      const { error } = materialProcessSchema.validate(req.body, { presence: 'optional' });
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_inward_id, received_qty, assigned_type, balance_qty, completed_qty, assigned_floor, assigned_shift, manager } = req.body;

      const materialProcess = await MaterialProcess.findByPk(id);

      if (!materialProcess) {
        return res.status(404).json({ error: 'MaterialProcess not found.' });
      }

      await materialProcess.update({ 
        material_inward_id, 
        received_qty, 
        assigned_type, 
        balance_qty, 
        completed_qty, 
        assigned_floor, 
        assigned_shift, 
        manager 
      });

      return res.json(materialProcess);
    } catch (error) {
      console.error('Error updating material process:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a MaterialProcess by ID
  async deleteMaterialProcess(req, res) {
    try {
      const { id } = req.params;
      const materialProcess = await MaterialProcess.findByPk(id);

      if (!materialProcess) {
        return res.status(404).json({ error: 'MaterialProcess not found.' });
      }

      await materialProcess.destroy();
      return res.json({ message: 'MaterialProcess deleted successfully.' });
    } catch (error) {
      console.error('Error deleting material process:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = MaterialProcessController;
