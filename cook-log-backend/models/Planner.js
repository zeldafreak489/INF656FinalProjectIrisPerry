const mongoose = require('mongoose');
const { Schema } = mongoose;

const plannerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  weekPlan: { type: Schema.Types.Mixed, default: {} } // store arbitrary object
}, { timestamps: true });

module.exports = mongoose.model('Planner', plannerSchema);
