const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Enable CORS middleware
app.use(cors());

// Explicitly handle preflight OPTIONS requests for all routes
app.options('*', cors());

app.use(express.json());

// Mount authentication routes under /api
app.use('/api', authRoutes);

// Only run app.listen in local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(5000, () => console.log('Server running on port 5000'));
}

module.exports = app;