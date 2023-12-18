const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  console.log(products);

  if (!products) {
    return next(new AppError('Products not found', 404));
  }

  return res
    .status(200)
    .json({ status: 'Success', products, results: products.length });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  return res.status(200).json({ status: 'Success', product });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create({ ...req.body, user: req.user._id });

  if (!product) {
    return next(new AppError('Unable to create product', 404));
  }

  res.status(200).json({ status: 'Success', product: product });
});
