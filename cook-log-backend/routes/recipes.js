const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Recipe = require('../models/Recipe');

// POST /api/recipes  (create) - protected
router.post('/', [ auth, [
  check('title', 'Title required').notEmpty(),
  check('instructions', 'Instructions required').notEmpty(),
  check('ingredients', 'Ingredients required').isArray()
] ], async (req, res, next) => {
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
      servings: data.servings
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) { next(err); }
});


// GET /api/recipes  (list) - protected; ?mine=true for only user's recipes
router.get('/', auth, async (req, res, next) => {
  try {
    const mine = req.query.mine === 'true';
    const query = mine ? { user: req.user.id } : { $or: [ { status: 'public' }, { user: req.user.id } ] };
    const recipes = await Recipe.find(query).sort({ createdAt: -1 }).populate('user', 'name email');
    res.json(recipes);
  } catch (err) { next(err); }
});

// GET /api/recipes/:id  (single)
router.get('/:id', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user','name email');
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.status !== 'public' && recipe.user._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(recipe);
  } catch (err) { next(err); }
});

// PUT /api/recipes/:id  (update)
router.put('/:id', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.user.toString() !== req.user.id) return res.status(403).json({ error: 'Access denied' });

    const fields = ['title','description','body','image','status','prepTimeMinutes','servings'];
    fields.forEach(f => { if (req.body[f] !== undefined) recipe[f] = req.body[f]; });

    await recipe.save();
    res.json(recipe);
  } catch (err) { next(err); }
});

// DELETE /api/recipes/:id
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.user.toString() !== req.user.id) return res.status(403).json({ error: 'Access denied' });
    await recipe.deleteOne();
    res.json({ message: 'Recipe removed' });
  } catch (err) { next(err); }
});

module.exports = router;
