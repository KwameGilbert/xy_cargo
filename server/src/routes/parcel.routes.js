import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import * as parcelController from '../controllers/parcel.controller.js';

const router = express.Router();

// Get all parcels
router.get(
  '/',
  [
    authenticate,
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('status').optional(),
    query('customer_id').optional().isInt(),
    validate,
  ],
  parcelController.getAllParcels
);

// Create parcel
router.post(
  '/',
  [
    authenticate,
    authorize('warehouse_staff', 'admin'),
    body('customer_id').isInt(),
    body('tracking_number').optional().trim(),
    body('weight').isFloat({ min: 0 }),
    body('description').optional().trim(),
    validate,
  ],
  parcelController.createParcel
);

// Get parcel by ID
router.get('/:id', authenticate, parcelController.getParcelById);

// Update parcel
router.patch(
  '/:id',
  [
    authenticate,
    authorize('warehouse_staff', 'admin'),
    body('status').optional(),
    body('weight').optional().isFloat({ min: 0 }),
    validate,
  ],
  parcelController.updateParcel
);

// Delete parcel
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  parcelController.deleteParcel
);

// Create claim for parcel
router.post('/:id/claims', authenticate, parcelController.createClaim);

// Add tracking event
router.post(
  '/:id/tracking',
  [
    authenticate,
    authorize('warehouse_staff', 'admin'),
    body('event_code').notEmpty(),
    body('description').notEmpty(),
    body('location').optional(),
    validate,
  ],
  parcelController.addTrackingEvent
);

export default router;
