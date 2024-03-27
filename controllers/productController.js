const models = require('../models');
const Product = models.Product;
const Category=models.Category;
const createProduct = async (req, res) => {
    try {
        const { categoryId, name, price, offer, weight } = req.body;
        const newProduct = await Product.create({ categoryId, name, price, offer, weight });
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { categoryId, name, price, offer, weight } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.categoryId = categoryId;
        product.name = name;
        product.price = price;
        product.offer = offer;
        product.weight = weight;
        await product.save();
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.destroy({ where: { id: productId } });
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const productsWithCategories = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: Category
        });
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    productsWithCategories
};
