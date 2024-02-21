const express = require('express');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/ProductController');
const { protect, isAdminUser } = require('../middlewares/Auth');

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdminUser, createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, isAdminUser, updateProduct)
  .delete(protect, isAdminUser, deleteProduct);

module.exports = router;
