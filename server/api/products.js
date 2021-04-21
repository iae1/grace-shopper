const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

// GET products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// POST products
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

// EDIT products
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

// DELETE products
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
