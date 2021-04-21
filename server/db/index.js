//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Order = require('./models/orders');
const Product = require('./models/products');

//associations could go here
// User.hasMany(Order);
// Order.belongsTo(User);
// Order.belongsToMany(Product);
// Product.belongsToMany(Order);

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
  },
};
