const models = require('../models');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = await models.Category.create({ name, description });
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create category' });
    }
};


// Retrieve all categories
exports.getAllCategories = async (req, res) => {
    try {
        console.log("welcome")
        const categories = await models.Category.findAll();
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};


// Retrieve all categories
exports.getAllCategoriesWithProducts = async (req, res) => {
    try {
        const categories = await models.Category.findAll({ include: models.Product });
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};






// Retrieve a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await models.Category.findByPk(categoryId, { include: models.Post });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, description } = req.body;
        const updatedCategory = await models.Category.update(
            { name, description },
            { where: { id: categoryId } }
        );
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await models.Category.destroy({ where: { id: categoryId } });
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};


exports.createCategoryAndProduct = async (req, res) => {
    try {
        // Extract category and product data from the request body
        const { name, createdAt, updatedAt, Products } = req.body;

        // Create the category in the database
        const category = await models.Category.create({ name, createdAt, updatedAt });

        // Create an array to store product IDs
        const productIds = [];

        // Iterate over the products array and create each product
        for (const productData of Products) {
            const { name: productName, price, offer, weight, createdAt: productCreatedAt, updatedAt: productUpdatedAt } = productData;
            // Create the product in the database
            const product = await models.Product.create({
                name: productName,
                price,
                offer,
                weight,
                categoryId: category.id, // Associate product with the created category
                createdAt: productCreatedAt,
                updatedAt: productUpdatedAt
            });
            productIds.push(product.id); // Push the ID of the created product to the array
        }

        // Fetch the created category with associated products
        const createdCategory = await models.Category.findOne({
            where: { id: category.id },
            include: { model: models.Product }
        });

        // Return the created category and products
        return res.status(201).json({ category: createdCategory, productIds });
    } catch (error) {
        console.error('Error creating category and product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

