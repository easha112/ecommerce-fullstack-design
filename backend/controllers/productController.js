const Product = require('../models/Product');

// @desc    Fetch all products with advanced search/filter
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      $or: [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { category: { $regex: req.query.keyword, $options: 'i' } }
      ]
    } : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product details
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product (Admin only)
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, price, image, description, category, countryLogo, stock } = req.body;
    const product = new Product({ name, price, image, description, category, countryLogo, stock });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.image = req.body.image || product.image;
      product.description = req.body.description || product.description;
      product.category = req.body.category || product.category;
      product.countryLogo = req.body.countryLogo || product.countryLogo;
      product.stock = req.body.stock || product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating product' });
  }
};

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };