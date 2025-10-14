import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import customerRoutes from './customer.routes.js';
import parcelRoutes from './parcel.routes.js';
import addressRoutes from './address.routes.js';
import warehouseRoutes from './warehouse.routes.js';
import shipmentRoutes from './shipment.routes.js';
import trackingRoutes from './tracking.routes.js';
import invoiceRoutes from './invoice.routes.js';
import paymentRoutes from './payment.routes.js';
import claimRoutes from './claim.routes.js';
import notificationRoutes from './notification.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const router = express.Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/parcels', parcelRoutes);
router.use('/addresses', addressRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/shipments', shipmentRoutes);
router.use('/tracking', trackingRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/payments', paymentRoutes);
router.use('/claims', claimRoutes);
router.use('/notifications', notificationRoutes);
router.use('/dashboards', dashboardRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    name: 'XY Cargo API',
    version: '1.0.0',
    description: 'Modern Express.js backend for XY Cargo logistics platform',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      customers: '/api/v1/customers',
      parcels: '/api/v1/parcels',
      addresses: '/api/v1/addresses',
      warehouses: '/api/v1/warehouses',
      shipments: '/api/v1/shipments',
      tracking: '/api/v1/tracking',
      invoices: '/api/v1/invoices',
      payments: '/api/v1/payments',
      claims: '/api/v1/claims',
      notifications: '/api/v1/notifications',
      dashboards: '/api/v1/dashboards',
    },
  });
});

export default router;
