const models = require('../models');
const Joi = require('joi');

const clientAddressSchema = Joi.object({
  client_id: Joi.number().integer().required(), 
  email: Joi.string().email().max(100).optional(),
  contact: Joi.string().max(50).optional(),
  address: Joi.string().max(250).optional(),
  area: Joi.string().max(100).optional(),
  city: Joi.string().max(100).optional(),
  pincode: Joi.string().max(10).optional(),
  contact_person_name: Joi.string().max(100).optional(),
  contact_person_mobile: Joi.string().max(15).optional(),
  contact_person_email: Joi.string().email().max(50).optional(),
  description: Joi.string().optional(),
  status: Joi.boolean().optional()
});

const ClientAddressController = {
  async createClientAddress(req, res) {
    try {
      const { error } = clientAddressSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }
      const { client_id, email, contact, address, area, city, pincode, contact_person_name, contact_person_mobile, contact_person_email, description, status } = req.body;

      const newClientAddress = await models.ClientAddress.create({
        client_id,
        email,
        contact,
        address,
        area,
        city,
        pincode,
        contact_person_name,
        contact_person_mobile,
        contact_person_email,
        description,
        status
      });

      return res.status(201).json(newClientAddress);
    } catch (error) {
      console.error('Error creating client address:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAllClientAddresses(req, res) {
    try {
      const clientAddresses = await models.ClientAddress.findAll();
      return res.status(200).json(clientAddresses);
    } catch (error) {
      console.error('Error fetching client addresses:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getClientAddress(req, res) {
    try {
      const { clientAddressId } = req.params;
      const clientAddress = await models.ClientAddress.findByPk(clientAddressId);
      if (!clientAddress) {
        return res.status(404).json({ error: 'Client address not found' });
      }
      return res.status(200).json(clientAddress);
    } catch (error) {
      console.error('Error fetching client address:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteClientAddress(req, res) {
    try {
      const { clientAddressId } = req.params;
      const deletedClientAddress = await models.ClientAddress.destroy({ where: { id: clientAddressId } });
      if (!deletedClientAddress) {
        return res.status(404).json({ error: 'Client address not found' });
      }
      return res.status(200).json({ message: 'Client address deleted successfully' });
    } catch (error) {
      console.error('Error deleting client address:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateClientAddress(req, res) {
    try {
      const { error } = clientAddressSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { clientAddressId } = req.params;
      const { email, contact, address, area, city, pincode, contact_person_name, contact_person_mobile, contact_person_email, description, status } = req.body;

      const clientAddress = await models.ClientAddress.findByPk(clientAddressId);
      if (!clientAddress) {
        return res.status(404).json({ error: 'Client address not found' });
      }

      clientAddress.email = email || clientAddress.email;
      clientAddress.contact = contact || clientAddress.contact;
      clientAddress.address = address || clientAddress.address;
      clientAddress.area = area || clientAddress.area;
      clientAddress.city = city || clientAddress.city;
      clientAddress.pincode = pincode || clientAddress.pincode;
      clientAddress.contact_person_name = contact_person_name || clientAddress.contact_person_name;
      clientAddress.contact_person_mobile = contact_person_mobile || clientAddress.contact_person_mobile;
      clientAddress.contact_person_email = contact_person_email || clientAddress.contact_person_email;
      clientAddress.description = description || clientAddress.description;
      clientAddress.status = status !== undefined ? status : clientAddress.status;

      await clientAddress.save();

      return res.status(200).json(clientAddress);
    } catch (error) {
      console.error('Error updating client address:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = ClientAddressController;
