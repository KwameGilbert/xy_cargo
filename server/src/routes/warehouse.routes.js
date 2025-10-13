import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import * as warehouseController from '../controllers/warehouse.controller.js';

const router = express.Router();

// Get all warehouses
router.get(
  '/',
  authenticate,
  authorize('admin'),
  warehouseController.getAllWarehouses
);

// Create warehouse
router.post(
  '/',
  [
    authenticate,
    authorize('admin'),
    body('name').trim().notEmpty(),
    body('code').trim().notEmpty(),
    body('location').notEmpty(),
    validate,
  ],
  warehouseController.createWarehouse
);

// Get warehouse settings
router.get(
  '/:id/settings',
  authenticate,
  authorize('admin'),
  warehouseController.getWarehouseSettings
);

// Update warehouse setting
router.put(
  '/:id/settings/:key',
  [
    authenticate,
    authorize('admin'),
    body('value').notEmpty(),
    validate,
  ],
  warehouseController.updateWarehouseSetting
);

export default router;
