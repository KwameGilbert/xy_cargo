import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import * as addressController from '../controllers/address.controller.js';

const router = express.Router();

// Get all addresses for current user
router.get('/', authenticate, addressController.getAllAddresses);

// Create address
router.post(
  '/',
  [
    authenticate,
    body('label').trim().notEmpty(),
    body('full_name').trim().notEmpty(),
    body('phone').trim().notEmpty(),
    body('address_line1').trim().notEmpty(),
    body('city').trim().notEmpty(),
    body('country').trim().notEmpty(),
    body('is_default').optional().isBoolean(),
    validate,
  ],
  addressController.createAddress
);

// Get address by ID
router.get('/:id', authenticate, addressController.getAddressById);

// Update address
router.put(
  '/:id',
  [
    authenticate,
    body('label').optional().trim(),
    body('full_name').optional().trim(),
    body('is_default').optional().isBoolean(),
    validate,
  ],
  addressController.updateAddress
);

// Delete address
router.delete('/:id', authenticate, addressController.deleteAddress);

export default router;
