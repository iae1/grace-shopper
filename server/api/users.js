const router = require('express').Router();
const { requireToken, isAdmin } = require('./gatekeeping');
const {
  models: { User, Product, Order },
} = require('../db');
module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET pending order (i.e., cart) route for logged in user
router.get('/:id/cart', requireToken, async (req,res,next) => {
  try {
    if (req.user && req.user.id.toString() === req.params.id) {
      const cart = await Order.findOne({
        include: Product,
        where: {
          userId: req.params.id,
          order_status: 'pending'
        }
      });
      if (cart) return res.status(200).send(cart)
      return res.status(200).send("This user doesn't have a cart")
    }
    res.status(200).send("You don't have permission to see this user's cart")
  } catch (err) {
    next(err);
  }
})
//PUT pending order (i.e., cart) route to checkout for logged in user
router.put('/:id/cart', requireToken, async (req,res,next) => {
  try {
    // checking out
    if (req.user && req.user.id.toString() === req.params.id) {
      const cart = await Order.findOne({
        include: Product,
        where: {
          userId: req.params.id,
          order_status: 'pending'
        }
      });
      if (cart) {
        const updatedCart = await cart.update({order_status: 'completed'})
        return res.status(200).send(updatedCart);
      }
      return res.send("This user doesn't have a cart")
    }
    res.send("You don't have permission to modify this user's cart")
  } catch (err) {
    next(err);
  }
})
