import { AppError } from '../utils/AppError.js';
import { parsePagination, paginatedResponse } from '../utils/pagination.js';

export const getUserNotifications = async (userId, filters) => {
  const { page, limit, offset } = parsePagination(filters);
  // TODO: Implement notification retrieval
  return paginatedResponse([], page, limit, 0);
};

export const markAsRead = async (notificationId, userId) => {
  // TODO: Implement mark as read
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};

export const markAllAsRead = async (userId) => {
  // TODO: Implement mark all as read
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};
