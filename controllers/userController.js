
const models = require('../models');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const saltRounds = 10;

const userSchema = Joi.object({
  firstName: Joi.string().min(4).max(20).required(),
  lastName: Joi.string().min(3).max(20),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  status: Joi.boolean().required(),
  createdAt: Joi.date().iso().required(),
  phone: Joi.string().pattern(/^[0-9\s-]+$/).optional()
});


const UserController = {
  async createUser(req, res) {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }
      const { firstName, lastName, email, password, status, createdAt, phone } = req.body;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Check if the email already exists
      const existingUser = await models.User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ errors: 'Email already exists' });
      }
  
      // Create a new user with the hashed password
      const newUser = await models.User.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword, // Save the hashed password
        status,
        createdAt
      });
  
      // Return the newly created user
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  async getAllUsers(req, res) {
    try {
      // Retrieve all users from the database
      const users = await models.User.findAll();

      // Return the list of users
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getUser(req, res) {
    try {
      const { userId } = req.params;

      // Find the user by ID
      const user = await models.User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return the user details
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      // Delete the user from the database
      const deletedUser = await models.User.destroy({ where: { id: userId } });

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return a success message
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateUser(req, res) {
    try {
      // Validate request data
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
      }
  
      const { userId } = req.params; // Assuming userId is passed as a URL parameter
      const { firstName, lastName, email, password, phone } = req.body;
  
      // Find the existing user
      const user = await models.User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if email is already in use by another user
      if (email && email !== user.email) {
        const existingEmailUser = await models.User.findOne({ where: { email } });
        if (existingEmailUser) {
          return res.status(400).json({ errors: 'Email already exists' });
        }
      }
  
      // Hash the new password if provided
      if (password) {
        user.password = await bcrypt.hash(password, saltRounds);
      }
  
      // Update user details
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.phone = phone || user.phone;
  
      // Save the updated user
      await user.save();
  
      // Return the updated user
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  
};

module.exports = UserController;
