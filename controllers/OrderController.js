const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const AppError = require('../utils/AppError');

exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems.length === 0) {
    return next(new AppError('No order items', 400));
  }

  let order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  order = await order.save();

  res.status(201).json({ status: 'success', order });
});

exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({ status: 'success', order });
});

exports.getMyOrders = asyncHandler(async (req, res, next) => {
  let orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new AppError('Orders not found', 404));
  }

  res.status(200).json({ status: 'success', orders });
});

exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  order = await order.save();

  res.status('200').json({ status: 'success', order });
});

exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  order = await order.save();

  res.status('200').json({ status: 'success', order });
});
