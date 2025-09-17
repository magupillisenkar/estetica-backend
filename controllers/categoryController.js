const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');

const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('name required');
  }
  const exists = await Category.findOne({ name });
  if (exists) {
    res.status(400);
    throw new Error('Category already exists');
  }
  const cat = await Category.create({ name, description });
  res.status(201).json(cat);
});

const listCategories = asyncHandler(async (req, res) => {
  const items = await Category.find({}).sort('name');
  res.json(items);
});

const updateCategory = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) {
    res.status(404); throw new Error('Category not found');
  }
  cat.name = req.body.name || cat.name;
  cat.description = req.body.description || cat.description;
  await cat.save();
  res.json(cat);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) {
    res.status(404); throw new Error('Category not found');
  }
  await cat.remove();
  res.json({ message: 'Category removed' });
});

module.exports = { createCategory, listCategories, updateCategory, deleteCategory };
