const express = require('express');
const products = require('../data/products');

const router = express.Router();

router.route('/').get((req, res, next) => {
  res.status(200).json(products);
});

router.route('/:id').get((req, res, next) => {
  const product = products.find((product) => product._id === req.params.id);
  res.status(200).json(product);
});

module.exports = router;
