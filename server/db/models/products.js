const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fit: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  length: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Product;
