import { successResponse } from '../utils/response.js';
import * as dashboardService from '../services/dashboard.service.js';

export const getAdminDashboard = async (req, res) => {
  const dashboard = await dashboardService.getAdminDashboard();
  successResponse(res, dashboard);
};

export const getWarehouseDashboard = async (req, res) => {
  const userId = req.user.id;
  const dashboard = await dashboardService.getWarehouseDashboard(userId);
  successResponse(res, dashboard);
};

export const getClientDashboard = async (req, res) => {
  const userId = req.user.id;
  const dashboard = await dashboardService.getClientDashboard(userId);
  successResponse(res, dashboard);
};
