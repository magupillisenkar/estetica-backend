const express = require('express');
const router = express.Router();
const { createProduct, listProducts, getProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', protect, upload.single('image'), createProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
