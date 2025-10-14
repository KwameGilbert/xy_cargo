import { AppError } from '../utils/AppError.js';
import { parsePagination, paginatedResponse } from '../utils/pagination.js';

export const getAllPayments = async (filters) => {
  const { page, limit, offset } = parsePagination(filters);
  // TODO: Implement payment retrieval
  return paginatedResponse([], page, limit, 0);
};

export const createPayment = async (paymentData) => {
  // TODO: Implement payment creation
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};
