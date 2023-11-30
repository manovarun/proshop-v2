const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
