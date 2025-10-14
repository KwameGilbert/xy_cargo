import { successResponse, createdResponse } from '../utils/response.js';
import * as customerService from '../services/customer.service.js';

/**
 * Get all customers
 */
export const getAllCustomers = async (req, res) => {
  const filters = req.query;
  const result = await customerService.getAllCustomers(filters);
  successResponse(res, result);
};

/**
 * Create new customer
 */
export const createCustomer = async (req, res) => {
  const customerData = req.body;
  const customer = await customerService.createCustomer(customerData);
  createdResponse(res, customer);
};

/**
 * Get customer by ID
 */
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  const customer = await customerService.getCustomerById(id);
  successResponse(res, customer);
};

/**
 * Update customer
 */
export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const customer = await customerService.updateCustomer(id, updates);
  successResponse(res, customer);
};

/**
 * Get customer parcels
 */
export const getCustomerParcels = async (req, res) => {
  const { id } = req.params;
  const result = await customerService.getCustomerParcels(id);
  successResponse(res, result);
};
