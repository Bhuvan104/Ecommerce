const { M_Material, MaterialUnit } = require('../../models');
const Joi = require('joi');

// Define Joi schema for validation
const materialSchema = Joi.object({
  name: Joi.string().max(100).required(),
  unit_id: Joi.number().integer().required(),
  type: Joi.string().max(100).required(),
  color: Joi.string().max(100).required(),
  status: Joi.boolean().default(true), // Default to true if not provided
});

// Define the MaterialController using the object literal pattern
const MaterialController = {
  // Create a new M_Material
  async createMaterial(req, res) {
    try {
      const { error } = materialSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { name, unit_id, type, color, status } = req.body;

      const newMaterial = await M_Material.create({
        name,
        unit_id,
        type,
        color,
        status,
      });

      return res.status(201).json(newMaterial);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get all M_Materials
  async getAllMaterials(req, res) {
    try {
      const materials = await M_Material.findAll({
        include: [{ model: MaterialUnit }],
      });

      return res.json(materials);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get a single M_Material by ID
  async getMaterial(req, res) {
    try {
      const { id } = req.params;
      const material = await M_Material.findByPk(id, {
        include: [{ model: MaterialUnit }],
      });

      if (!material) {
        return res.status(404).json({ error: 'Material not found.' });
      }

      return res.json(material);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Update an M_Material by ID
  async updateMaterial(req, res) {
    try {
      const { id } = req.params;

      // Allow partial updates; only validate fields present in the request body
      const { error } = materialSchema.validate(req.body, { presence: 'optional' });
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { name, unit_id, type, color, status } = req.body;

      const material = await M_Material.findByPk(id);

      if (!material) {
        return res.status(404).json({ error: 'Material not found.' });
      }

      await material.update({ name, unit_id, type, color, status });

      return res.json(material);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Delete an M_Material by ID
  async deleteMaterial(req, res) {
    try {
      const { id } = req.params;
      const material = await M_Material.findByPk(id);

      if (!material) {
        return res.status(404).json({ error: 'Material not found.' });
      }

      await material.destroy();
      return res.json({ message: 'Material deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

// Export the MaterialController object
module.exports = MaterialController;
