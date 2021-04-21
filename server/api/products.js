const router = require('express').Router()
const { models: { Product }} = require('../db')


// GET /api/products
const router = require('express').Router();
const {requireToken, isAdmin} = require('./gatekeeping');
const {
  models: { Product },
} = require('../db');

// GET products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    next(err);
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

});

// POST products
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

// EDIT products
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

// DELETE products
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
