const {
  models: { User, Product, Order, OrderDetails },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err)
  }
}

const checkUserMatch = async (req, res, next) => {
  try {
    if (req.user.id.toString() === req.params.id) {
      next();
    } else {
      return res.status(403).send("You don't have permission to see this user's information")
    }
  } catch (err) {
    next(err)
  }
}

const userCart = async (req, res, next) => {
  try {
    req.userCart = await Order.findOne({
      include: Product,
      where: {
        userId: req.user.id.toString(),
        order_status: 'pending'
      }
    });
    next();
  } catch (err) {
    next(err)
  }
}

const orderDetail = async (req, res, next) => {
  try {
    req.orderDetail = await OrderDetails.findOne({
      where: {
        orderId: req.userCart.id,
        productId: req.params.productId
      }
    })
    next();
  } catch (err) {
    next(err)
  }
}

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.admin) {
      next();
    } else {
      return res.status(403).send("You are not an admin");
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  requireToken,
  isAdmin,
  checkUserMatch,
  userCart,
  orderDetail
}
