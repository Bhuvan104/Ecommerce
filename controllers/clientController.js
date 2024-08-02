const models = require('../models');
const Joi = require('joi');

// Define Joi schema for validation
const clientSchema = Joi.object({
  client_code: Joi.string().max(50).required(),
  client_name: Joi.string().max(100).required(),
  status: Joi.boolean().required(),
  createdAt: Joi.date().iso().required(),
  updatedAt: Joi.date().iso().required()
});

const ClientController = {
  async createClient(req, res) {
    try {
      const { error } = clientSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { client_code, client_name, status, createdAt, updatedAt } = req.body;

      // Create a new client
      const newClient = await models.Client.create({
        client_code,
        client_name,
        status,
        createdAt,
        updatedAt
      });

      return res.status(201).json(newClient);
    } catch (error) {
      console.error('Error creating client:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAllClients(req, res) {
    try {
      const clients = await models.Client.findAll();
      return res.status(200).json(clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getClient(req, res) {
    try {
      const { clientId } = req.params;
      const client = await models.Client.findByPk(clientId);

      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }

      return res.status(200).json(client);
    } catch (error) {
      console.error('Error fetching client details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteClient(req, res) {
    try {
      const { clientId } = req.params;
      const deletedClient = await models.Client.destroy({ where: { id: clientId } });

      if (!deletedClient) {
        return res.status(404).json({ error: 'Client not found' });
      }

      return res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
      console.error('Error deleting client:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateClient(req, res) {
    try {
      const { error } = clientSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }

      const { clientId } = req.params;
      const { client_code, client_name, status, createdAt, updatedAt } = req.body;

      const client = await models.Client.findByPk(clientId);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }

      client.client_code = client_code || client.client_code;
      client.client_name = client_name || client.client_name;
      client.status = status !== undefined ? status : client.status;
      client.createdAt = createdAt || client.createdAt;
      client.updatedAt = updatedAt || client.updatedAt;

      await client.save();

      return res.status(200).json(client);
    } catch (error) {
      console.error('Error updating client:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = ClientController;
