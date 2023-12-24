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

exports.getUserProfile = asyncHandler(async (req, res, next) => {});

exports.updateUserProfile = asyncHandler(async (req, res, next) => {});

exports.updateUser = asyncHandler(async (req, res, next) => {});

exports.deleteUser = asyncHandler(async (req, res, next) => {});
