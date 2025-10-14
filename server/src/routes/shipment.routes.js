import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import * as shipmentController from '../controllers/shipment.controller.js';

const router = express.Router();

// Get all shipments
router.get(
  '/',
  [
    authenticate,
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('status').optional(),
    validate,
  ],
  shipmentController.getAllShipments
);

// Create shipment
router.post(
  '/',
  [
    authenticate,
    authorize('warehouse_staff', 'admin'),
    body('shipment_type').isIn(['AIR', 'SEA', 'EXPRESS']),
    body('origin_warehouse_id').isInt(),
    body('destination_country').trim().notEmpty(),
    validate,
  ],
  shipmentController.createShipment
);

// Get shipment by ID
router.get('/:id', authenticate, shipmentController.getShipmentById);

// Update shipment
router.patch(
  '/:id',
  [
    authenticate,
    authorize('warehouse_staff', 'admin'),
    body('status').optional(),
    validate,
  ],
  shipmentController.updateShipment
);

export default router;
