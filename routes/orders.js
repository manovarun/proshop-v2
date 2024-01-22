const express = require('express');

const {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require('../controllers/OrderController');
const { protect, isAdminUser } = require('../middlewares/Auth');

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, isAdminUser, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdminUser, updateOrderToDelivered);

module.exports = router;
