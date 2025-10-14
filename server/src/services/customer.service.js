import { AppError } from '../utils/AppError.js';
import { parsePagination, paginatedResponse } from '../utils/pagination.js';
import * as customerModel from '../models/customer.model.js';

export const getAllCustomers = async (filters) => {
  const { page, limit, offset } = parsePagination(filters);
  const { customers, total } = await customerModel.findAll({ ...filters, limit, offset });
  return paginatedResponse(customers, page, limit, total);
};

export const createCustomer = async (customerData) => {
  const customer = await customerModel.create(customerData);
  return customer;
};

export const getCustomerById = async (customerId) => {
  const customer = await customerModel.findById(customerId);
  
  if (!customer) {
    throw new AppError('Customer not found', 404, 'CUSTOMER_NOT_FOUND');
  }
  
  return customer;
};

export const updateCustomer = async (customerId, updates) => {
  const customer = await customerModel.update(customerId, updates);
  
  if (!customer) {
    throw new AppError('Customer not found', 404, 'CUSTOMER_NOT_FOUND');
  }
  
  return customer;
};

export const getCustomerParcels = async (customerId) => {
  const parcels = await customerModel.getParcels(customerId);
  return parcels;
};
