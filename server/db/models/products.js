const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  color: {
    type: Sequelize.STRING
  },
  fit: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  size: {
    type: Sequelize.STRING
  },
  length: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
