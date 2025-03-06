const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const artifactsRoutes = require('./routes/artifacts');
const authRoutes = require('./routes/auth');
const db = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/artifacts', artifactsRoutes);
app.use('/api/auth', authRoutes);

// Root route with notice about Supabase
app.get('/', (req, res) => {
  res.json({
    message: 'Heritage Portal API',
    notice: 'This is a dummy backend. The actual implementation uses Supabase for database and authentication.'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('NOTE: This is a dummy backend. The actual implementation uses Supabase.');
});

module.exports = app; 