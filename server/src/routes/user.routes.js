import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

// Get current user profile
router.get('/me', authenticate, userController.getCurrentUser);

// Update current user profile
router.patch(
  '/me',
  [
    authenticate,
    body('full_name').optional().trim().notEmpty(),
    body('phone').optional().trim(),
    body('preferred_language').optional().isIn(['en', 'zh']),
    validate,
  ],
  userController.updateCurrentUser
);

// Admin routes
router.get('/:id', authenticate, authorize('admin'), userController.getUserById);
router.get('/', authenticate, authorize('admin'), userController.getAllUsers);

export default router;
