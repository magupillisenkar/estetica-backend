const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // since auth is static, we use email to identify cart
  items: [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
