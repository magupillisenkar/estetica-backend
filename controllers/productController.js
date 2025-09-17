const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Category = require('../models/Category');

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock = 0, category } = req.body;

  if (!name || price == null) {
    res.status(400);
    throw new Error('name and price are required');
  }

  // optional: validate category
  if (category) {
    const cat = await Category.findById(category);
    if (!cat) {
      res.status(400);
      throw new Error('Category not found');
    }
  }

  const imagePath = req.file ? req.file.path : null;

  const p = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    image: imagePath
  });

  res.status(201).json(p);
});

const listProducts = asyncHandler(async (req, res) => {
  const { q, category, page = 1, limit = 24 } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  const skip = (Number(page)-1) * Number(limit);
  const [items, total] = await Promise.all([
    Product.find(filter).populate('category').skip(skip).limit(Number(limit)),
    Product.countDocuments(filter)
  ]);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
});

const getProduct = asyncHandler(async (req, res) => {
  const p = await Product.findById(req.params.id).populate('category');
  if (!p) { res.status(404); throw new Error('Product not found'); }
  res.json(p);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) { res.status(404); throw new Error('Product not found'); }
  await p.remove();
  res.json({ message: 'Product removed' });
});

module.exports = { createProduct, listProducts, getProduct, deleteProduct };
