//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Order = require('./models/orders');
const Product = require('./models/products');
const OrderDetails = require('./models/order_details');

//associations could go here
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderDetails });
Product.belongsToMany(Order, { through: OrderDetails });

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    OrderDetails,
  },
};
