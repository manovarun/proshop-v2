const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

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

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.image = image || product.image;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.countInStock = countInStock || product.countInStock;

  product = await product.save();

  res.status(200).json({ status: 'Success', product });
});
