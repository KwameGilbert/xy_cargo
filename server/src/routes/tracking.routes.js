import express from 'express';
import { optionalAuth } from '../middleware/auth.js';
import * as trackingController from '../controllers/tracking.controller.js';

const router = express.Router();

// Public tracking endpoint - no auth required
router.get('/:trackingNumber', optionalAuth, trackingController.trackParcel);

export default router;
