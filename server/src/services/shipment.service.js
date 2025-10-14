import { AppError } from '../utils/AppError.js';
import { parsePagination, paginatedResponse } from '../utils/pagination.js';

export const getAllShipments = async (filters) => {
  const { page, limit, offset } = parsePagination(filters);
  // TODO: Implement shipment retrieval
  return paginatedResponse([], page, limit, 0);
};

export const createShipment = async (shipmentData) => {
  // TODO: Implement shipment creation
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};

export const getShipmentById = async (shipmentId) => {
  // TODO: Implement shipment retrieval
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};

export const updateShipment = async (shipmentId, updates) => {
  // TODO: Implement shipment update
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};
