const router = require('express').Router();
const {
  models: { Order, OrderDetails, Product },
} = require('../db');
module.exports = router;

// >>>>>>> NEEDS FIXING <<<<<<<<<<
// POST route to create an order for guest checkout
router.post('/', async (req, res, next) => {
  try {
    //create the cart for this guest
    const { address, email, cartItems } = req.body;
    const cart = await Order.create({
      address,
      email,
      order_status: 'completed'
    });

    //create all the orders details based on the info provided
    for (let item of cartItems) {
      await OrderDetails.create({
        quantity: item.quantity,
        fit: item.fit,
        size: item.size,
        length: item.length,
        productId: item.productId,
        orderId: cart.id
      });
    }

    const allOrderDetails = await OrderDetails.findAll({
      where: {
        orderId: cart.id
      }
    })

    //set the new total price
    const total_price = allOrderDetails.reduce((accumulator, current) => accumulator + (current.price * current.quantity), 0);

    await cart.update({
      total_price
    })

    let updatedCart = await Order.findByPk(req.userCart.id,{
      include: Product,
    })

    res.status(200).send(updatedCart);
  } catch (err) {
    next(err);
  }
})
