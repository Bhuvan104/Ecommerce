const { MaterialInward } = require('../../models');
const Joi = require('joi');

const materialInwardSchema = Joi.object({
  client_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
  dc_image: Joi.string().max(250).optional(),
  received_date: Joi.date().iso().required(),
  estimated_dispatch_date: Joi.date().iso().optional(),
  material_numbers: Joi.number().integer().required(),
  is_quantity_approved: Joi.boolean().optional(),
  rejection_reason: Joi.string().max(100).optional(),
  job_id: Joi.string().max(100).optional(),
  job_type: Joi.string().max(100).optional(),
  material_status: Joi.number().integer().optional(),
  status: Joi.boolean().optional()
});

const MaterialInwardController = {
  async createMaterialInward(req, res) {
    try {
      const { error } = materialInwardSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const newMaterialInward = await MaterialInward.create(req.body);
      return res.status(201).json(newMaterialInward);
    } catch (error) {
      console.error('Error creating material inward:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAllMaterialInwards(req, res) {
    try {
      const materialInwards = await MaterialInward.findAll();
      return res.status(200).json(materialInwards);
    } catch (error) {
      console.error('Error fetching material inwards:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getMaterialInward(req, res) {
    try {
      const { id } = req.params;
      const materialInward = await MaterialInward.findByPk(id);
      if (!materialInward) {
        return res.status(404).json({ error: 'Material Inward not found' });
      }
      return res.status(200).json(materialInward);
    } catch (error) {
      console.error('Error fetching material inward:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteMaterialInward(req, res) {
    try {
      const { id } = req.params;
      const deletedCount = await MaterialInward.destroy({ where: { id } });
      if (deletedCount === 0) {
        return res.status(404).json({ error: 'Material Inward not found' });
      }
      return res.status(200).json({ message: 'Material Inward deleted successfully' });
    } catch (error) {
      console.error('Error deleting material inward:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateMaterialInward(req, res) {
    try {
      const { id } = req.params;
      const { error } = materialInwardSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const [updated] = await MaterialInward.update(req.body, { where: { id } });
      if (updated === 0) {
        return res.status(404).json({ error: 'Material Inward not found' });
      }

      const updatedMaterialInward = await MaterialInward.findByPk(id);
      return res.status(200).json(updatedMaterialInward);
    } catch (error) {
      console.error('Error updating material inward:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = MaterialInwardController;
