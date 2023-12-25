const express = require('express');
const {
  createUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/UserController');
const { protect, isAdminUser } = require('../middlewares/Auth');
const { register, login, logout } = require('../controllers/AuthController');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);

router.route('/').get(protect, isAdminUser, getUsers);
router.route('/').post(protect, isAdminUser, createUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
