const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');

exports.getProducts = asyncHandler(async (req, res, next) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};
  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (!products) {
    return next(new AppError('Products not found', 404));
  }

  return res.status(200).json({
    status: 'Success',
    products,
    page,
    pages: Math.ceil(count / pageSize),
    results: products.length,
  });
});

exports.getTopProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  if (!products) {
    return next(new AppError('Products not found', 404));
  }
  return res.status(200).json({ status: 'Success', products });
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

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({ status: 'Success' });
});

exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  const alreadyReviewed = product.reviews.find((review) => {
    console.log(review.user.toString());
    return review.user.toString() === req.user._id.toString();
  });

  if (alreadyReviewed) {
    return next(new AppError('Product already reviewed', 404));
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating,
    comment,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;

  await product.save();

  res.status(200).json({ status: 'Review added successfully', product });
});
