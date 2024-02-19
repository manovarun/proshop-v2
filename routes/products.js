const express = require('express');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
} = require('../controllers/ProductController');
const { protect, isAdminUser } = require('../middlewares/Auth');

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdminUser, createProduct);

router.route('/:id').get(getProduct).put(protect, isAdminUser, updateProduct);

module.exports = router;
