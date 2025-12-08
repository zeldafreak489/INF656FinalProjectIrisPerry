const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  instructions: { type: String, required: true },
  ingredients: { type: [String], required: true },
  image: { type: String, default: '' },
  status: { type: String, enum: ['private', 'public'], default: 'private' },
  prepTimeMinutes: { type: Number },
  servings: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
