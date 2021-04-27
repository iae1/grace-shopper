const router = require('express').Router();
const { requireToken, isAdmin, userCart, orderDetail, cartRequireToken, productPrice } = require('./gateKeeping');

const {
  models: { User, Product, Order, OrderDetails },
} = require('../db');
module.exports = router;

//GET route for all users
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {model: Order,
        include: {model: Product}
      }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET pending order (i.e., cart) route for logged in user
router.get('/cart', requireToken, userCart, async (req,res,next) => {
  try {
    if (req.userCart) return res.status(200).send(req.userCart)
    return res.status(200).send("This user doesn't have a cart")
  } catch (err) {
    next(err);
  }
})

//PUT pending order (i.e., cart) route to checkout for logged in user
router.put('/cart', cartRequireToken, userCart, async (req,res,next) => {
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

//GET route for a user by id including all of its information (This is just for admin in the backend, so it's fine that it needs user's id)
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

//DELETE route to delete a product from a user's cart
router.delete('/cart/:productId', requireToken, userCart, orderDetail, async (req,res,next) => {
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
//this route as of 5:48pm 4/24 has not bee updated to reflect changes made to POST
router.put('/cart/:productId', cartRequireToken, userCart, orderDetail, async (req,res,next) => {
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
router.post('/cart/:productId', cartRequireToken, userCart, orderDetail, productPrice, async (req,res,next) => {
  try {
    const { fit, size, length, quantity } = req.body;
    console.log('req.productPrice--->', req.productPrice)
    console.log('req.orderDetail--->', req.orderDetail)
    if (!req.orderDetail) {

      await OrderDetails.create({
        fit,
        size,
        length,
        quantity,
        price: req.productPrice,
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


