const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // owner of the recipe
    title: { type: String, required: true, trim: true }, // recipe title
    description: { type: String }, // brief description of the recipe
    ingredients: [{ type: String, required: true }], // list of ingredients
    instructions: { type: String, required: true }, // cooking instructions
    prepTime: { type: Number }, // in minutes
    cookTime: { type: Number }, // in minutes
    servings: { type: Number }, // number of servings
    tags: [{ type: String }], // e.g., ["vegetarian", "dessert"]
    imageUrl: { type: String }, // URL to an image of the dish
    status: { type: String, enum: ['public', 'private', 'draft'], default: 'private' }, // visibility status of recipe
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);