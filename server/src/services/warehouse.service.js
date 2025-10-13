import { AppError } from '../utils/AppError.js';

export const getAllWarehouses = async () => {
  // TODO: Implement warehouse retrieval
  return [];
};

export const createWarehouse = async (warehouseData) => {
  // TODO: Implement warehouse creation
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};

export const getWarehouseSettings = async (warehouseId) => {
  // TODO: Implement settings retrieval
  return [];
};

export const updateWarehouseSetting = async (warehouseId, key, value) => {
  // TODO: Implement setting update
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};
