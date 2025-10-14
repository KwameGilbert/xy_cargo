import { AppError } from '../utils/AppError.js';

export const getAdminDashboard = async () => {
  // TODO: Implement admin dashboard data
  return {
    metrics: {
      parcels_in_transit: 0,
      pending_payments: 0,
      revenue_month: 0,
    },
    recent_activity: [],
  };
};

export const getWarehouseDashboard = async (userId) => {
  // TODO: Implement warehouse dashboard data
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};

export const getClientDashboard = async (userId) => {
  // TODO: Implement client dashboard data
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};
