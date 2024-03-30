const models = require('../models');

// Create a new address
exports.addressValidationRules = [
    {
        field:"door",
        required: true,
        maxLength: 255 // Adjust the max length as per your requirement
    },
     {
        field:"street",
        required: true,
        maxLength: 255 // Adjust the max length as per your requirement
    },
     {
        field:"post",
        required: true,
        maxLength: 255 // Adjust the max length as per your requirement
    },
     {
        field:"dist",
        maxLength: 255 // Adjust the max length as per your requirement
    },
     {
        field:"state",
        required: true,
        maxLength: 255 // Adjust the max length as per your requirement
    },
     {
        field:"country",
        required: true,
        maxLength: 255 // Adjust the max length as per your requirement
    }
];

exports.createAddress = async (req, res) => {
    try {
        const { userId, door, street, post, dist, state, country } = req.body;
        const newAddress = await models.Address.create({ userId, door, street, post, dist, state, country });
        res.status(201).json({ message: 'Address created successfully', address: newAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create address' });
    }
};

// Update an existing address
exports.updateAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const { door, street, post, dist, state, country } = req.body;
        const updatedAddress = await models.Address.update(
            { door, street, post, dist, state, country },
            { where: { id: addressId } }
        );
        res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update address' });
    }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const deletedAddress = await models.Address.destroy({ where: { id: addressId } });
        if (!deletedAddress) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete address' });
    }
};

exports.getUserAddressesWithInclude = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await models.User.findByPk(userId, { include: models.Address });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ userAddresses: user.Addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user addresses' });
    }
};
exports.getUserAddressesWithoutInclude = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await models.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Assuming there's a direct relationship between User and Address
        const addresses = await user.getAddresses();
        res.status(200).json({ userAddresses: addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user addresses' });
    }
};

exports.getUserAddresses = async (req, res) => {
    try {
        // Fetch all users
        const users = await models.User.findAll();
        
        // Assuming there's a direct relationship between User and Address
        // Fetch addresses for each user
        const userAddresses = await Promise.all(users.map(async (user) => {
            const addresses = await user.getAddresses();
            return { userId: user.id, addresses: addresses };
        }));
        
        res.status(200).json({ userAddresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user addresses' });
    }
};
module.exports = exports;
