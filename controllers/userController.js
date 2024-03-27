
const models = require('../models');
function validateFirstName(firstName) {
  const minLength = 2; // Minimum length requirement
  const maxLength = 50; // Maximum length requirement
  const errors = [];

  // Format Check: Alphabetic characters only
  const formatRegex = /^[a-zA-Z]+$/;

  // Check if first name is provided
  if (!firstName) {
      errors.push("First name is required.");
  }

  // Length Limit Check
  if (firstName.length < minLength || firstName.length > maxLength) {
      errors.push("First name must be between " + minLength + " and " + maxLength + " characters long.");
  }

  // Format Check
  if (!formatRegex.test(firstName)) {
      errors.push("First name can only contain alphabetic characters.");
  }

  // Optional: Whitespace Trimming
  const trimmedFirstName = firstName.trim();
  if (trimmedFirstName !== firstName) {
      errors.push("Leading or trailing whitespace is not allowed in the first name.");
  }

  // Optional: Case Consistency
  const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  if (formattedFirstName !== firstName) {
      errors.push("First name should start with a capital letter followed by lowercase letters.");
  }

  // Return validation errors array
  return errors.length ? errors : null;
}
const UserController = {
  async getUsers_add_orders(req, res) {
    try {
      // Find all users and include associated addresses and orders
      const users = await models.User.findAll({
        include: [
          { model: models.Address }, // Include addresses associated with each user
          { model: models.Order }    // Include orders associated with each user
        ]
      });

      // Return the user details along with addresses and orders
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching user details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    },
    async getUsers_add_orders_product(req, res) {
      try {
        // Find all users and include associated addresses and orders
        const users = await models.User.findAll({
          include: [
            { model: models.Address }, // Include addresses associated with each user
            { model: models.Order,
              include: [
                { 
                  model: models.Product, // Include products associated with each order
                  
                }
              ],
              attributes: { exclude: ['productId'] }  }    // Include orders associated with each user
          ]
        });
  
        // Return the user details along with addresses and orders
        return res.status(200).json(users);
      } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      }
  ,
  async createAddressForUser(req, res) {
    try {
      const { userId } = req.params;
      const { door, street, post, dist, state, country } = req.body;

      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create the address and associate it with the user
      const newAddress = await Address.create({
        userId,
        door,
        street,
        post,
        dist,
        state,
        country
      });

      // Return the newly created address
      return res.status(201).json(newAddress);
    } catch (error) {
      console.error('Error creating address:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createOrderForUser(req, res) {
    try {
      const userId =req.params.userId;

      const { productId, placedAt, offerAtOrder, datePurchased, deliveryAddressId, paymentId, deliveryStatus } = req.body;

      // Check if the user exists
      const user = await models.User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create the order and associate it with the user
      const newOrder = await models.Order.create({
        customerId: userId,
        productId,
        placedAt,
        offerAtOrder,
        datePurchased,
        deliveryAddressId,
        paymentId,
        deliveryStatus
      });

      // Return the newly created order
      return res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createAddressForUser(req, res) {
    try {
      const { userId } = req.params;
      const { door, street, post, dist, state, country } = req.body;

      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create the address and associate it with the user
      const newAddress = await Address.create({
        userId,
        door,
        street,
        post,
        dist,
        state,
        country
      });

      // Return the newly created address
      return res.status(201).json(newAddress);
    } catch (error) {
      console.error('Error creating address:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createUser(req, res) {
    try {
      
      const { firstName, lastName, email, phone, password } = req.body;
      const validationRules = {
        firstName: {
            required: true,
            maxLength: 50,
            pattern: /^[a-zA-Z0-9\s]*$/,
            message: 'Invalid name, only letters, numbers, and spaces are allowed'
        },
        lastName: {
          required: true,
          maxLength: 50,
          pattern: /^[a-zA-Z0-9\s]*$/,
          message: 'Invalid name, only letters, numbers, and spaces are allowed'
      },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
            minLength: 10,
        },
        phone: {
            required: true,
            pattern: /^[0-9]{10}$/,
            message: 'Invalid phone number, must be 10 digits'
        }
    };
      const errors = {
        firstName: [],
        lastName: [],
        email: [],
        phone: [],
    };
    Object.entries(validationRules).forEach(([field, rules]) => {
      if (rules.required && req.body[field][0]==" " || req.body[field][-1]==" ") {
        errors[field].push(`${field} should not start or end with space`);
    }
      if (rules.required && !req.body[field]) {
          errors[field].push(`${field} is required`);
      }
      if (rules.minLength && req.body[field] && req.body[field].length < rules.minLength) {
          errors[field].push(`${field} must be at least ${rules.minLength} characters`);
      }
      if (rules.maxLength && req.body[field] && req.body[field].length > rules.maxLength) {
          errors[field].push(`${field} must be at most ${rules.maxLength} characters`);
      }
      if (rules.pattern && req.body[field] && !rules.pattern.test(req.body[field])) {
          errors[field].push(rules.message || `Invalid ${field}`);
      }
      if (rules.min && req.body[field] && req.body[field] < rules.min) {
          errors[field].push(`${field} must be at least ${rules.min}`);
      }
      if (rules.max && req.body[field] && req.body[field] > rules.max) {
          errors[field].push(`${field} must be at most ${rules.max}`);
      }
  });

      // Extract user data from the request body
      const hasErrors = Object.values(errors).some(fieldErrors => fieldErrors.length > 0);

// If there are validation errors, return a 400 response with errors
      if (hasErrors) {
          return res.status(400).json({ errors });
      }
      
      // Check if the email already exists
      const existingUser = await models.User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Create the user in the database with the hashed password
      const newUser = await models.User.create({
        firstName,
        lastName,
        email,
        phone,
        password: password, // Save the hashed password
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
      const { userId } = req.params;
      const { firstName, lastName, email, phone } = req.body;

      // Find the user by ID
      const user = await models.User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user details
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.phone = phone;
      await user.save();

      // Return the updated user
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createAddressForUser(req, res) {
    try {
      console.log("retytuytrew")
      // Extract user ID from the request parameters or request body
      const { userId } = req.params; // Assuming user ID is in the request parameters
      // Retrieve the user from the database
      const user = await models.User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Extract address data from the request body
      const { door, street, post, dist, state, country } = req.body;

      // Create the address and associate it with the user
      const newAddress = await models.Address.create({
        userId: userId,
        door: door,
        street: street,
        post: post,
        dist: dist,
        state: state,
        country: country
      });
      const userWithAddress = await models.User.findByPk(userId, { include: models.Address });

    if (!userWithAddress) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(201).json({ 
        method: req.method, // Include the HTTP method
        user: userWithAddress,
    });
        } catch (error) {
          console.error('Error creating address:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
    }


  
  
};

module.exports = UserController;
