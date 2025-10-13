import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// Login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
  ],
  authController.login
);

// Signup
router.post(
  '/signup',
  [
    body('full_name').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('phone').optional().trim(),
    body('account_type').optional().isIn(['Individual', 'Business']),
    validate,
  ],
  authController.signup
);

// Refresh token
router.post('/refresh', authController.refreshToken);

// Logout
router.post('/logout', authenticate, authController.logout);

// 2FA Setup
router.post('/2fa/setup', authenticate, authController.setup2FA);

// 2FA Verify
router.post(
  '/2fa/verify',
  [
    authenticate,
    body('code').isLength({ min: 6, max: 6 }).withMessage('6-digit code required'),
    validate,
  ],
  authController.verify2FA
);

export default router;
