const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');


const getCart = asyncHandler(async (req, res) => {
  const userEmail = req.user ? req.user.email : req.query.email;
  if (!userEmail) { res.status(400); throw new Error('user email required'); }
  let cart = await Cart.findOne({ userEmail }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ userEmail, items: [] });
  }
  res.json(cart);
});


const addToCart = asyncHandler(async (req, res) => {
  const userEmail = req.user ? req.user.email : req.body.email;
  if (!userEmail) { res.status(400); throw new Error('user email required'); }
  const { productId, qty = 1 } = req.body;
  if (!productId) { res.status(400); throw new Error('productId required'); }
  const product = await Product.findById(productId);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  let cart = await Cart.findOne({ userEmail });
  if (!cart) cart = await Cart.create({ userEmail, items: [] });
  const idx = cart.items.findIndex(i => i.product.toString() === productId);
  if (idx === -1) {
    cart.items.push({ product: productId, qty: Number(qty) });
  } else {
    cart.items[idx].qty = Number(cart.items[idx].qty) + Number(qty);
  }
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});


const updateCartItem = asyncHandler(async (req, res) => {
  const userEmail = req.user ? req.user.email : req.body.email;
  if (!userEmail) { res.status(400); throw new Error('user email required'); }
  const { qty } = req.body;
  const itemId = req.params.itemId;
  if (qty == null) { res.status(400); throw new Error('qty required'); }
  let cart = await Cart.findOne({ userEmail });
  if (!cart) { res.status(404); throw new Error('Cart not found'); }
  const idx = cart.items.findIndex(i => i._id.toString() === itemId);
  if (idx === -1) { res.status(404); throw new Error('Cart item not found'); }
  if (Number(qty) <= 0) {
    cart.items.splice(idx, 1);
  } else {
    cart.items[idx].qty = Number(qty);
  }
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});


const removeCartItem = asyncHandler(async (req, res) => {
  const userEmail = req.user ? req.user.email : req.body.email;
  if (!userEmail) { res.status(400); throw new Error('user email required'); }
  const itemId = req.params.itemId;
  let cart = await Cart.findOne({ userEmail });
  if (!cart) { res.status(404); throw new Error('Cart not found'); }
  const idx = cart.items.findIndex(i => i._id.toString() === itemId);
  if (idx === -1) { res.status(404); throw new Error('Cart item not found'); }
  cart.items.splice(idx, 1);
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});

const removeAllCartItems = asyncHandler(async (req, res) => {
  const userEmail = req.user ? req.user.email : req.body.email;

  if (!userEmail) {
    res.status(400);
    throw new Error('User email required');
  }

  let cart = await Cart.findOne({ userEmail });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = [];
  await cart.save();
  await cart.populate('items.product');

  res.json(cart);
});




module.exports = { getCart, addToCart, updateCartItem, removeCartItem, removeAllCartItems };
