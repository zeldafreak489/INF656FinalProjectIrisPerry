require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json({ limit: '5mb' }));

// Routers (we'll create these files next)
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const plannerRoutes = require('./routes/planner');

// Allow requests from frontend
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:4200';
app.use(cors({ origin: allowedOrigin }));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/planner', plannerRoutes);

// Simple health check
app.get('/api/ping', (req, res) => res.json({ ok: true }));

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

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
