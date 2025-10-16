import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
// Import other route files

const router = express.Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// Mount other routes

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    name: 'XY Cargo API',
    version: '1.0.0',
    description: 'Modern Express.js backend for XY Cargo logistics platform',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      // List other endpoints
    },
  });
});

export default router;