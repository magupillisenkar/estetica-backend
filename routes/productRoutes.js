const express = require('express');
const router = express.Router();
const { createProduct, listProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', protect, upload.single('image'), createProduct);
// router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
