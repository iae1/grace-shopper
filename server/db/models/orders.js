const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  order_status: {
    //can be 'completed' or 'pending'
    type: Sequelize.STRING,
    defaultValue: 'pending',
  },
  total_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

module.exports = Order;
