const Sequelize = require('sequelize');
const db = require('../db');

const OrderDetails = db.define('order_details', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  fit: {
    type: Sequelize.STRING,
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  length: {
    type: Sequelize.STRING,
  },
});

module.exports = OrderDetails;
