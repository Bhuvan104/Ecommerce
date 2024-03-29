
const models = require('../models');
const userValidations = require('../validations/userValidations');
const errors = {
  firstName: [],
  lastName: [],
  email: [],
  phone: [],
};
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
const UserController = {
  async createUserWithOrdersAndProducts(req, res,errors) {
    try {
      // Extract user data from the request body
      const { firstName, lastName, email, phone, password, addresses, orders } = req.body;
      // Create the user
      const user = await models.User.create({
        firstName,
        lastName,
        email,
        phone,
        password
      });
  
      // Create associated addresses if provided
      if (addresses && addresses.length > 0) {
        await Promise.all(addresses.map(async addressData => {
          await models.Address.create({
            userId: user.id,
            ...addressData
          });
        }));
      }
  
      // Create associated orders if provided
      if (orders && orders.length > 0) {
        await Promise.all(orders.map(async orderData => {
          const order = await models.Order.create({
            userId: user.id,
            ...orderData
          });
  
          // Create associated products for each order if provided
          if (orderData.products && orderData.products.length > 0) {
            await Promise.all(orderData.products.map(async productData => {
              await models.Product.create({
                orderId: order.id,
                ...productData
              });
            }));
          }
        }));
      }
  
      // Return success response
      return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  
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
      
      const req_data={ firstName, lastName, email, phone, password }=req.body
      
      
    userValidations(validationRules,req_data,errors)    

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
      const req_data={ firstName, lastName, email, phone}
      userValidations(validationRules,req_data,errors)
      const hasErrors = Object.values(errors).some(fieldErrors => fieldErrors.length > 0);
      if (hasErrors) {
        return res.status(400).json({ errors });
    }
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
