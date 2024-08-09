const { MaterialInward } = require('../../models');
const Joi = require('joi');

const materialInwardSchema = Joi.object({
  client_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
  dc_image: Joi.any().optional(),
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

      const materialInward = await MaterialInward.findByPk(id);

      if (!materialInward) {
        return res.status(404).json({ error: 'MaterialInward not found' });
      }

      // Delete image file if it exists
      if (materialInward.dc_image) {
        const imagePath = path.join(__dirname, '..', 'uploads', materialInward.dc_image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await materialInward.destroy();
      res.status(200).json({ message: 'MaterialInward deleted successfully' });
    } catch (error) {
      console.error('Error deleting MaterialInward:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  async updateMaterialInward(req, res) {
    try {
      const { id } = req.params;
      const { client_id, quantity, received_date, estimated_dispatch_date, material_numbers, is_quantity_approved, rejection_reason, job_id, job_type, material_status, status } = req.body;
      let dc_image = req.file ? req.file.filename : undefined;

      const materialInward = await MaterialInward.findByPk(id);

      if (!materialInward) {
        return res.status(404).json({ error: 'MaterialInward not found' });
      }

      if (dc_image) {
        // Delete the old image if it exists
        if (materialInward.dc_image) {
          const oldImagePath = path.join(__dirname, '..', 'uploads', materialInward.dc_image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      } else {
        dc_image = materialInward.dc_image; // Keep the old image if no new image is provided
      }

      await materialInward.update({
        client_id,
        quantity,
        dc_image,
        received_date,
        estimated_dispatch_date,
        material_numbers,
        is_quantity_approved,
        rejection_reason,
        job_id,
        job_type,
        material_status,
        status
      });

      res.status(200).json({ message: 'MaterialInward updated successfully', data: materialInward });
    } catch (error) {
      console.error('Error updating MaterialInward:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
};

module.exports = MaterialInwardController;
