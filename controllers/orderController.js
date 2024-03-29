// orderController.js

const models = require('../models');

const orderValidationRules = {
    productId: {
        required: true,
        // Add more rules if necessary
    },
    customerId: {
        required: true,
        // Add more rules if necessary
    },
    placedAt: {
        required: true,
        // Add rules as needed
    },
    offerAtOrder: {
        required: true,
        // Add rules as needed
    },
    datePurchased: {
        required: true,
        // Add rules as needed
    },
    deliveryAddressId: {
        required: true,
        // Add rules as needed
    },
    paymentId: {
        required: true,
        // Add rules as needed
    },
    deliveryStatus: {
        required: true,
        // Add rules as needed
    },
};

const getUsersWithOrders = async (req, res) => {
    try {
        // Retrieve all users along with their associated orders and associated products
        const usersWithOrders = await models.User.findAll({
            include: [
                {
                    model: models.Order,
                    include: [
                        {
                            model: models.Product, // Include the Product model
                            foreignKey: 'productId' // Specify the foreign key used in the association
                        },
                        {
                            model: models.User, // Include the Product model
                            foreignKey: 'customerId' // Specify the foreign key used in the association
                        },
                        
                    ],
                    required: false // Use 'required: false' for a LEFT JOIN
                }
            ]
        });

        return res.status(200).json(usersWithOrders);
    } catch (error) {
        console.error('Error fetching users with orders:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const createOrder = async (req, res) => {

    try {
        const {
            productId,
            customerId,
            placedAt,
            offerAtOrder,
            datePurchased,
            deliveryAddressId,
            paymentId,
            deliveryStatus
        } = req.body;

        // Check if productId and customerId exist
        const product = await models.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const customer = await models.Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Create the order
        const order = await models.Order.create({
            productId,
            customerId,
            placedAt,
            offerAtOrder,
            datePurchased,
            deliveryAddressId,
            paymentId,
            deliveryStatus
        });

        return res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createOrder,
    getUsersWithOrders
};
