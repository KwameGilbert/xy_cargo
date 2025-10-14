import { successResponse, noContentResponse } from '../utils/response.js';
import * as notificationService from '../services/notification.service.js';

export const getUserNotifications = async (req, res) => {
  const userId = req.user.id;
  const filters = req.query;
  const result = await notificationService.getUserNotifications(userId, filters);
  successResponse(res, result);
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  await notificationService.markAsRead(id, userId);
  noContentResponse(res);
};

export const markAllAsRead = async (req, res) => {
  const userId = req.user.id;
  await notificationService.markAllAsRead(userId);
  noContentResponse(res);
};
