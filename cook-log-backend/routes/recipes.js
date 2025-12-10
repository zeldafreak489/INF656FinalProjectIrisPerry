const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Recipe = require('../models/Recipe');

const router = express.Router();

// ---------------------
// PUBLIC ROUTE
// ---------------------

// GET all recipes (public)
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) { next(err); }
});

// ---------------------
// PROTECTED ROUTES
// ---------------------

// POST /api/recipes  (create) - protected
router.post(
  '/',
  auth,
  [
    check('title', 'Title required').notEmpty(),
    check('instructions', 'Instructions required').notEmpty(),
    check('ingredients', 'Ingredients required').isArray(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const data = req.body;
      const recipe = new Recipe({
        user: req.user.id,
        title: data.title,
        description: data.description || '',
        instructions: data.instructions,
        ingredients: data.ingredients,
        image: data.image || '',
        status: data.status || 'private',
        prepTimeMinutes: data.prepTimeMinutes,
        servings: data.servings,
      });
      await recipe.save();
      res.status(201).json(recipe);
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/recipes/:id  (update) - protected
router.put('/:id', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.user.toString() !== req.user.id)
      return res.status(403).json({ error: 'Access denied' });

    Object.assign(recipe, req.body);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/recipes/:id  (delete) - protected
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.user.toString() !== req.user.id)
      return res.status(403).json({ error: 'Access denied' });

    await recipe.deleteOne();
    res.json({ message: 'Recipe removed' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
