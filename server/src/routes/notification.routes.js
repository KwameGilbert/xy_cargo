import express from 'express';
import { query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import * as notificationController from '../controllers/notification.controller.js';

const router = express.Router();

// Get user notifications
router.get(
  '/',
  [
    authenticate,
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('is_read').optional().isBoolean(),
    validate,
  ],
  notificationController.getUserNotifications
);

// Mark notification as read
router.patch('/:id/read', authenticate, notificationController.markAsRead);

// Mark all notifications as read
router.post('/mark-all-read', authenticate, notificationController.markAllAsRead);

export default router;
