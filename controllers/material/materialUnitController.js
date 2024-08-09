// controllers/materialUnitController.js

const { MaterialUnit } = require('../../models'); // Adjust path as necessary
const Joi = require('joi');

// Define Joi schema for validation
const materialUnitSchema = Joi.object({
  unit: Joi.string().max(50).required(),
  status: Joi.boolean().default(true),
});

const MaterialUnitController = {
  // Create a new MaterialUnit
  async createMaterialUnit(req, res) {
    try {
      const { error } = materialUnitSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { unit, status } = req.body;

      const newMaterialUnit = await MaterialUnit.create({ unit, status });

      return res.status(201).json(newMaterialUnit);
    } catch (error) {
      console.error('Error creating material unit:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all MaterialUnits
  async getAllMaterialUnits(req, res) {
    try {
      const materialUnits = await MaterialUnit.findAll();
      return res.json(materialUnits);
    } catch (error) {
      console.error('Error fetching material units:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get a MaterialUnit by ID
  async getMaterialUnit(req, res) {
    try {
      const { id } = req.params;
      const materialUnit = await MaterialUnit.findByPk(id);

      if (!materialUnit) {
        return res.status(404).json({ error: 'MaterialUnit not found.' });
      }

      return res.json(materialUnit);
    } catch (error) {
      console.error('Error fetching material unit:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update a MaterialUnit by ID
  async updateMaterialUnit(req, res) {
    try {
      const { id } = req.params;
      const { error } = materialUnitSchema.validate(req.body, { presence: 'optional' });
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { unit, status } = req.body;

      const materialUnit = await MaterialUnit.findByPk(id);

      if (!materialUnit) {
        return res.status(404).json({ error: 'MaterialUnit not found.' });
      }

      await materialUnit.update({ unit, status });

      return res.json(materialUnit);
    } catch (error) {
      console.error('Error updating material unit:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a MaterialUnit by ID
  async deleteMaterialUnit(req, res) {
    try {
      const { id } = req.params;
      const materialUnit = await MaterialUnit.findByPk(id);

      if (!materialUnit) {
        return res.status(404).json({ error: 'MaterialUnit not found.' });
      }

      await materialUnit.destroy();
      return res.json({ message: 'MaterialUnit deleted successfully.' });
    } catch (error) {
      console.error('Error deleting material unit:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = MaterialUnitController;
