const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.render('index', { categories });
});

// Add a new category
router.post('/', async (req, res) => {
  const category = new Category({ title: req.body.title });
  await category.save();
  res.redirect('/categories');
});

module.exports = router;
