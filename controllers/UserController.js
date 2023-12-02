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
