const jwt = require('jsonwebtoken');
const models = require('../models');

const AuthController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await models.User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare the password with the hashed password stored in the database
      

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      req.user = user;
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = AuthController;
