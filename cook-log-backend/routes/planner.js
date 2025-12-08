const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Planner = require('../models/Planner');

// GET planner (for logged-in user)
router.get('/', auth, async (req, res, next) => {
  try {
    let planner = await Planner.findOne({ user: req.user.id });
    if (!planner) {
      planner = new Planner({ user: req.user.id, weekPlan: {} });
      await planner.save();
    }
    res.json(planner);
  } catch (err) { next(err); }
});

// PUT planner (update)
router.put('/', auth, async (req, res, next) => {
  try {
    const { weekPlan } = req.body;
    if (!weekPlan) return res.status(400).json({ error: 'weekPlan required' });

    const planner = await Planner.findOneAndUpdate(
      { user: req.user.id },
      { weekPlan },
      { new: true, upsert: true }
    );
    res.json(planner);
  } catch (err) { next(err); }
});

module.exports = router;
