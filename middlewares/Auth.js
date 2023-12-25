const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { promisify } = require('util');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer ')
  // ) {
  //   token = req.headers.authorization.split(' ')[1];
  // }

  token = req.cookies.jwt;

  if (!token)
    return next(
      new AppError('User not authorized, token failed, please login', 401)
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    return next(
      new AppError('The user belonging to this token does no longer exist'),
      401
    );
  }
  req.user = user;
  next();
});

exports.isAdminUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (req.user && user.isAdmin) {
    next();
  } else {
    return next(new AppError('User not authorized to access this URL', 400));
  }
});
