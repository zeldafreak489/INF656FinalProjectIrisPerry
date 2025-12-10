require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

// Middleware
app.use(express.json({ limit: '5mb' }));

// CORS
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:4200' }));

// Routers
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const plannerRoutes = require('./routes/planner');

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/planner', plannerRoutes);

// Serve Angular
app.use(history());
app.use(express.static(path.join(__dirname, '../cook-log-frontend/dist/cook-log-frontend')));

// Error middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Server error' });
});

// Connect to Mongo and start server
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });
