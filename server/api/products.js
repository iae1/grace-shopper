const router = require('express').Router()
const { models: { Product }} = require('../db')


// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/suits
router.get('/suits', async (req, res, next) => {
  try {
  
    const suits = await Product.findAll({
      where: {
        category: "Suit"
      }
    })
    
    
    res.json(suits)
  } catch (err) {
    next(err)
  }
})

module.exports = router
