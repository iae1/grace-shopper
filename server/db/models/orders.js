const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  order_status: {
    //can be 'completed' or 'pending'
    type: Sequelize.STRING,
    defaultValue: 'pending',
  },
});

module.exports = Order;
