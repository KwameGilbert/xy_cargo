import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import * as claimController from '../controllers/claim.controller.js';

const router = express.Router();

// Get all claims
router.get(
  '/',
  [
    authenticate,
    authorize('admin'),
    query('status').optional(),
    query('parcel_id').optional().isInt(),
    validate,
  ],
  claimController.getAllClaims
);

// Update claim (admin only)
router.patch(
  '/:id',
  [
    authenticate,
    authorize('admin'),
    body('status').optional().isIn(['pending', 'approved', 'rejected']),
    body('resolution_notes').optional().trim(),
    validate,
  ],
  claimController.updateClaim
);

export default router;
