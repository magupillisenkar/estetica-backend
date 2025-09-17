const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeCartItem, removeAllCartItems } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:itemId', updateCartItem);
router.delete('/remove/:itemId', removeCartItem);
router.delete('/remove-all', removeAllCartItems);

module.exports = router;
