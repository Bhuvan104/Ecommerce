'use strict';
const { PurchaseDetails } = require('../models');
const Joi = require('joi');

// Define Joi schema for validation
const purchaseDetailsSchema = Joi.object({
  material_id: Joi.number().integer().required(),
  client_id: Joi.number().integer().required(),
  qty: Joi.string().max(100).required(),
  used: Joi.string().max(100).required(),
  order_date: Joi.date().required(),
  received_date: Joi.date().required()
});

const PurchaseDetailsController = {
  // Create a new PurchaseDetails
  async createPurchaseDetails(req, res) {
    try {
      const { error } = purchaseDetailsSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_id, client_id, qty, used, order_date, received_date } = req.body;

      const newPurchaseDetails = await PurchaseDetails.create({ 
        material_id, 
        client_id, 
        qty, 
        used, 
        order_date, 
        received_date 
      });

      return res.status(201).json(newPurchaseDetails);
    } catch (error) {
      console.error('Error creating purchase details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all PurchaseDetails
  async getAllPurchaseDetails(req, res) {
    try {
      const purchaseDetails = await PurchaseDetails.findAll();
      return res.json(purchaseDetails);
    } catch (error) {
      console.error('Error fetching purchase details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get a PurchaseDetails by ID
  async getPurchaseDetails(req, res) {
    try {
      const { id } = req.params;
      const purchaseDetails = await PurchaseDetails.findByPk(id);

      if (!purchaseDetails) {
        return res.status(404).json({ error: 'PurchaseDetails not found.' });
      }

      return res.json(purchaseDetails);
    } catch (error) {
      console.error('Error fetching purchase details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update a PurchaseDetails by ID
  async updatePurchaseDetails(req, res) {
    try {
      const { id } = req.params;
      const { error } = purchaseDetailsSchema.validate(req.body, { presence: 'optional' });
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { material_id, client_id, qty, used, order_date, received_date } = req.body;

      const purchaseDetails = await PurchaseDetails.findByPk(id);

      if (!purchaseDetails) {
        return res.status(404).json({ error: 'PurchaseDetails not found.' });
      }

      await purchaseDetails.update({ 
        material_id, 
        client_id, 
        qty, 
        used, 
        order_date, 
        received_date 
      });

      return res.json(purchaseDetails);
    } catch (error) {
      console.error('Error updating purchase details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a PurchaseDetails by ID
  async deletePurchaseDetails(req, res) {
    try {
      const { id } = req.params;
      const purchaseDetails = await PurchaseDetails.findByPk(id);

      if (!purchaseDetails) {
        return res.status(404).json({ error: 'PurchaseDetails not found.' });
      }

      await purchaseDetails.destroy();
      return res.json({ message: 'PurchaseDetails deleted successfully.' });
    } catch (error) {
      console.error('Error deleting purchase details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = PurchaseDetailsController;
