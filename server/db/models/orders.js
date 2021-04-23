const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  order_status: {
    //can be 'completed' or 'pending'
    type: Sequelize.STRING,
    defaultValue: 'pending',
  },
  total_price: {
    type: Sequelize.INTEGER
  },
  address: {
    type: Sequelize.TEXT
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

module.exports = Order;
