import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import * as customerController from '../controllers/customer.controller.js';

const router = express.Router();

// Get all customers (admin only)
router.get(
  '/',
  [
    authenticate,
    authorize('admin', 'agent'),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('account_type').optional().isIn(['Individual', 'Business']),
    query('verification_status').optional(),
    validate,
  ],
  customerController.getAllCustomers
);

// Create customer (admin, agent)
router.post(
  '/',
  [
    authenticate,
    authorize('admin', 'agent'),
    body('full_name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().trim(),
    body('account_type').optional().isIn(['Individual', 'Business']),
    validate,
  ],
  customerController.createCustomer
);

// Get customer by ID
router.get('/:id', authenticate, customerController.getCustomerById);

// Update customer
router.patch(
  '/:id',
  [
    authenticate,
    authorize('admin'),
    body('verification_status').optional(),
    validate,
  ],
  customerController.updateCustomer
);

// Get customer parcels
router.get('/:id/parcels', authenticate, customerController.getCustomerParcels);

export default router;
