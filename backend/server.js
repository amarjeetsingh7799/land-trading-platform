const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  credentials: true
}));
app.set('trust proxy', 1);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/land-trading-platform';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('💡 Make sure MongoDB is running and MONGODB_URI is correct in .env file');
  });

// Import Routes
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const favoriteRoutes = require('./routes/favorites');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: ' Land Trading Platform API',
    status: 'Running',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile (requires token)'
      },
      properties: {
        list: 'GET /api/properties',
        detail: 'GET /api/properties/:id',
        create: 'POST /api/properties (seller/admin)',
        update: 'PUT /api/properties/:id (owner/admin)',
        delete: 'DELETE /api/properties/:id (owner/admin)'
      },
      favorites: {
        list: 'GET /api/favorites',
        add: 'POST /api/favorites/:id',
        remove: 'DELETE /api/favorites/:id'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
});
