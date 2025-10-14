import { AppError } from '../utils/AppError.js';
import { parsePagination, paginatedResponse } from '../utils/pagination.js';

export const getAllInvoices = async (filters) => {
  const { page, limit, offset } = parsePagination(filters);
  // TODO: Implement invoice retrieval
  return paginatedResponse([], page, limit, 0);
};

export const getInvoiceById = async (invoiceId) => {
  // TODO: Implement invoice retrieval
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};

export const createInvoice = async (invoiceData) => {
  // TODO: Implement invoice creation
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};
