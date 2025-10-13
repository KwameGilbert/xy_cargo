import { successResponse, createdResponse, noContentResponse } from '../utils/response.js';
import * as addressService from '../services/address.service.js';

export const getAllAddresses = async (req, res) => {
  const userId = req.user.id;
  const addresses = await addressService.getUserAddresses(userId);
  successResponse(res, addresses);
};

export const createAddress = async (req, res) => {
  const userId = req.user.id;
  const addressData = { ...req.body, user_id: userId };
  const address = await addressService.createAddress(addressData);
  createdResponse(res, address);
};

export const getAddressById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const address = await addressService.getAddressById(id, userId);
  successResponse(res, address);
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const updates = req.body;
  const address = await addressService.updateAddress(id, userId, updates);
  successResponse(res, address);
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  await addressService.deleteAddress(id, userId);
  noContentResponse(res);
};
