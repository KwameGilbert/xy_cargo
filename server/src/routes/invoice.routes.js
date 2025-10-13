import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import * as invoiceController from '../controllers/invoice.controller.js';

const router = express.Router();

// Get all invoices
router.get(
  '/',
  [
    authenticate,
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('status').optional(),
    validate,
  ],
  invoiceController.getAllInvoices
);

// Get invoice by ID
router.get('/:id', authenticate, invoiceController.getInvoiceById);

// Create invoice
router.post(
  '/',
  [
    authenticate,
    authorize('admin'),
    body('customer_id').isInt(),
    body('amount').isFloat({ min: 0 }),
    validate,
  ],
  invoiceController.createInvoice
);

export default router;
