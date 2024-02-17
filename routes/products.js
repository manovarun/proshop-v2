const express = require('express');

const {
  getProducts,
  getProduct,
  createProduct,
} = require('../controllers/ProductController');
const { protect, isAdminUser } = require('../middlewares/Auth');

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdminUser, createProduct);

router.route('/:id').get(getProduct);

module.exports = router;
