// controllers/inventoryDetailsController.js
'use strict';
const { InventoryDetails } = require('../models');
const Joi = require('joi');

// Define Joi schema for validation
const inventoryDetailsSchema = Joi.object({
  material_id: Joi.number().integer().required(),
  qty: Joi.string().max(100).required(),
  used: Joi.string().max(100).required()
});

const InventoryDetailsController = {
  // Create a new InventoryDetail
  async createInventoryDetail(req, res) {
    try {
      const { error } = inventoryDetailsSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_id, qty, used } = req.body;

      const newInventoryDetail = await InventoryDetails.create({
        material_id,
        qty,
        used
      });

      return res.status(201).json(newInventoryDetail);
    } catch (error) {
      console.error('Error creating inventory detail:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all InventoryDetails
  async getAllInventoryDetails(req, res) {
    try {
      const inventoryDetails = await InventoryDetails.findAll();
      return res.json(inventoryDetails);
    } catch (error) {
      console.error('Error fetching inventory details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get an InventoryDetail by ID
  async getInventoryDetail(req, res) {
    try {
      const { id } = req.params;
      const inventoryDetail = await InventoryDetails.findByPk(id);

      if (!inventoryDetail) {
        return res.status(404).json({ error: 'InventoryDetail not found.' });
      }

      return res.json(inventoryDetail);
    } catch (error) {
      console.error('Error fetching inventory detail:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an InventoryDetail by ID
  async updateInventoryDetail(req, res) {
    try {
      const { id } = req.params;
      const { error } = inventoryDetailsSchema.validate(req.body, { presence: 'optional' });
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_id, qty, used } = req.body;

      const inventoryDetail = await InventoryDetails.findByPk(id);

      if (!inventoryDetail) {
        return res.status(404).json({ error: 'InventoryDetail not found.' });
      }

      await inventoryDetail.update({
        material_id,
        qty,
        used
      });

      return res.json(inventoryDetail);
    } catch (error) {
      console.error('Error updating inventory detail:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete an InventoryDetail by ID
  async deleteInventoryDetail(req, res) {
    try {
      const { id } = req.params;
      const inventoryDetail = await InventoryDetails.findByPk(id);

      if (!inventoryDetail) {
        return res.status(404).json({ error: 'InventoryDetail not found.' });
      }

      await inventoryDetail.destroy();
      return res.json({ message: 'InventoryDetail deleted successfully.' });
    } catch (error) {
      console.error('Error deleting inventory detail:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = InventoryDetailsController;
