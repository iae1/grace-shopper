const Sequelize = require('sequelize');
const db = require('../db');

const OrderDetails = db.define('order_details', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderDetails;
