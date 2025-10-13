import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import * as dashboardController from '../controllers/dashboard.controller.js';

const router = express.Router();

// Admin dashboard
router.get(
  '/admin',
  authenticate,
  authorize('admin'),
  dashboardController.getAdminDashboard
);

// Warehouse dashboard
router.get(
  '/warehouse',
  authenticate,
  authorize('warehouse_staff'),
  dashboardController.getWarehouseDashboard
);

// Client dashboard
router.get(
  '/client',
  authenticate,
  authorize('customer'),
  dashboardController.getClientDashboard
);

export default router;
