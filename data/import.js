const dotenv = require('dotenv').config({ path: '.env' });
const connectDB = require('../db');
const Product = require('../models/Product');
let products = require('./products');

connectDB();

const importData = async () => {
  products = products.map((product) => ({
    ...product,
    user: '6567ecef1a5d296cb633d9c9',
  }));
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data successfully imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  return importData();
} else if (process.argv[2] === '-d') {
  return deleteData();
}
