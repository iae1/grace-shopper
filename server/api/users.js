const router = require('express').Router();
const { requireToken, isAdmin, checkUserMatch, userCart, orderDetail } = require('./gatekeeping');
const {
  models: { User, Product, Order, OrderDetails },
} = require('../db');
module.exports = router;

//GET route for all users
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET route for a user by id including all of its information
router.get('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findOne({
      include: {model: Order,
        include: {model: Product}
      },
      where: {
        id: req.params.id
      }
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//GET pending order (i.e., cart) route for logged in user
router.get('/:id/cart', requireToken, checkUserMatch, userCart, async (req,res,next) => {
  try {
    if (req.userCart) return res.status(200).send(req.userCart)
    return res.status(200).send("This user doesn't have a cart")
  } catch (err) {
    next(err);
  }
})

//PUT pending order (i.e., cart) route to checkout for logged in user
router.put('/:id/cart', requireToken, checkUserMatch, userCart, async (req,res,next) => {
  try {
    // checking out
    const { address } = req.body;

    for (let prod of req.userCart.products){
      await OrderDetails.update(
        {
          price: prod.price
        },
        {where: {
          orderId: req.userCart.id,
          productId: prod.id
        }})
    }

    const allOrderDetails = await OrderDetails.findAll({
      where: {
        orderId: req.userCart.id
      }
    })

    //set the new total price
    const total_price = allOrderDetails.reduce((accumulator, current) => accumulator + (current.price * current.quantity), 0);

    let cart = await Order.findByPk(req.userCart.id,{
      include: Product,
    })
    let updatedCart = await cart.update({
      address,
      order_status: 'completed',
      total_price
    })

    //create a new empty cart for this user
    const newEmptycart = await Order.create({ email: req.user.email });
    await newEmptycart.setUser(req.user);

    res.status(200).send(updatedCart);
  } catch (err) {
    next(err);
  }
})

//DELETE route to delete a product from a user's cart
router.delete('/:id/cart/:productId', requireToken, checkUserMatch, userCart, orderDetail, async (req,res,next) => {
  try {
    if (req.orderDetail) {
      await req.orderDetail.destroy();
      const updatedCart = await Order.findOne({
        include: Product,
        where: {
          userId: req.user.id.toString(),
          order_status: 'pending'
        }
      });
      return res.status(200).send(updatedCart);
    }
    res.status(200).send("This product isn't in the user's cart")
  } catch (err) {
    next(err);
  }
})

//PUT route to update a product's quantity, size, fit or length in a user's cart
router.put('/:id/cart/:productId', requireToken, checkUserMatch, userCart, orderDetail, async (req,res,next) => {
  try {
    if (req.orderDetail) {
      await req.orderDetail.update({
        quantity: req.body.quantity,
        fit: req.body.fit,
        size: req.body.size,
        length: req.body.length
      });
      const updatedCart = await Order.findOne({
        include: Product,
        where: {
          userId: req.user.id.toString(),
          order_status: 'pending'
        }
      });
      return res.status(200).send(updatedCart);
    }
    res.status(200).send("This product isn't in the user's cart")
  } catch (err) {
    next(err);
  }
})

//POST route to add a product to a user's cart
router.post('/:id/cart/:productId', requireToken, checkUserMatch, userCart, orderDetail, async (req,res,next) => {
  try {
    const { fit, size, length} = req.body;
    if (!req.orderDetail) {
      await OrderDetails.create({
        fit,
        size,
        length,
        quantity: 1,
        orderId: req.userCart.id,
        productId: req.params.productId
      });
      const updatedCart = await Order.findOne({
        include: Product,
        where: {
          userId: req.user.id.toString(),
          order_status: 'pending'
        }
      });
      return res.status(201).send(updatedCart);
    }
    res.status(200).send("This product is already in the user's cart")
  } catch (err) {
    next(err);
  }
})


