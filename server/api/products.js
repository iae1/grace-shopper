const router = require('express').Router();
const { requireToken, isAdmin } = require('./gateKeeping');
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
});

// GET /api/products/suits
router.get('/suits', async (req, res, next) => {
  try {
    const suits = await Product.findAll({
      where: {
        category: 'Suit',
      },
      attributes: ['id', 'name', 'imageUrl', 'color', 'price'],
    });
    res.json(suits);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/sportcoats
router.get('/sportcoats', async (req, res, next) => {
  try {
    const sportcoats = await Product.findAll({
      where: {
        category: 'Sportcoats',
      },
      attributes: ['id', 'name', 'imageUrl', 'color', 'price'],
    });
    res.json(sportcoats);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/shirts
router.get('/shirts', async (req, res, next) => {
  try {
    const shirts = await Product.findAll({
      where: {
        category: 'Shirts',
      },
      attributes: ['id', 'name', 'imageUrl', 'color', 'price'],
    });
    res.json(shirts);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/trousers
router.get('/trousers', async (req, res, next) => {
  try {
    const trousers = await Product.findAll({
      where: {
        category: 'Trousers',
      },
      attributes: ['id', 'name', 'imageUrl', 'color', 'price'],
    });
    res.json(trousers);
  } catch (err) {
    next(err);
  }
});

// GET single suit
router.get('/suits/:id', async (req, res, next) => {
  try {
    const suit = await Product.findByPk(req.params.id);
    res.json(suit);
  } catch (err) {
    next(err);
  }
});

// GET single sportcoat
router.get('/sportcoats/:id', async (req, res, next) => {
  try {
    const sportcoat = await Product.findByPk(req.params.id);
    res.json(sportcoat);
  } catch (err) {
    next(err);
  }
});

// GET single shirt
router.get('/shirts/:id', async (req, res, next) => {
  try {
    const shirt = await Product.findByPk(req.params.id);
    res.json(shirt);
  } catch (err) {
    next(err);
  }
});

// GET single trouser
router.get('/trousers/:id', async (req, res, next) => {
  try {
    const trouser = await Product.findByPk(req.params.id);
    res.json(trouser);
  } catch (err) {
    next(err);
  }
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
