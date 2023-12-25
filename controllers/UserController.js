const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.createUser = asyncHandler(async (req, res, next) => {
  if (!req.user) return next(new AppError('User not authorized', 400));

  const user = await User.create({ ...req.body });

  if (!user) {
    return next(new AppError('Unable to create user', 401));
  }

  return res.status(201).json({ status: 'success', user });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  if (!req.user) return next(new AppError('User not authorized', 400));

  const users = await User.find();

  if (!users) {
    return next(new AppError('Unable find users', 404));
  }

  return res.status(200).json({ status: 'success', users });
});

exports.getUserById = asyncHandler(async (req, res, next) => {});

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) return next(new AppError('User not found', 404));

  return res.status(200).json({ status: 'success', user });
});

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError('User not found', 404));

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  if (!updatedUser)
    return next(new AppError('Unable to save user, please try again', 404));

  res.status(200).json({ status: 'success', user: updatedUser });
});

exports.updateUser = asyncHandler(async (req, res, next) => {});

exports.deleteUser = asyncHandler(async (req, res, next) => {});
