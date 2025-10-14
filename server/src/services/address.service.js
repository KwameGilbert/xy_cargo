import { AppError } from '../utils/AppError.js';

export const getUserAddresses = async (userId) => {
  // TODO: Implement address retrieval
  return [];
};

export const createAddress = async (addressData) => {
  // TODO: Implement address creation
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};

export const getAddressById = async (addressId, userId) => {
  // TODO: Implement address retrieval
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};

export const updateAddress = async (addressId, userId, updates) => {
  // TODO: Implement address update
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};

export const deleteAddress = async (addressId, userId) => {
  // TODO: Implement address deletion
  throw new AppError('Not implemented', 501, 'NOT_IMPLEMENTED');
};
