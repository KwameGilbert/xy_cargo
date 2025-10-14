import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import * as paymentController from '../controllers/payment.controller.js';

const router = express.Router();

// Get all payments
router.get(
  '/',
  [
    authenticate,
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    validate,
  ],
  paymentController.getAllPayments
);

// Create payment
router.post(
  '/',
  [
    authenticate,
    body('invoice_id').isInt(),
    body('amount').isFloat({ min: 0 }),
    body('payment_method').notEmpty(),
    validate,
  ],
  paymentController.createPayment
);

export default router;
