import { AppError } from '../utils/AppError.js';
import { parsePagination, paginatedResponse } from '../utils/pagination.js';
import * as userModel from '../models/user.model.js';

export const getUserById = async (userId) => {
  const user = await userModel.findById(userId);
  
  if (!user) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  }

  // Remove sensitive data
  delete user.password_hash;
  
  return user;
};

export const updateUser = async (userId, updates) => {
  const user = await userModel.update(userId, updates);
  
  if (!user) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  }

  delete user.password_hash;
  return user;
};

export const getAllUsers = async (filters) => {
  const { page, limit, offset } = parsePagination(filters);
  const { users, total } = await userModel.findAll({ limit, offset });
  
  // Remove sensitive data
  const sanitizedUsers = users.map(user => {
    delete user.password_hash;
    return user;
  });
  
  return paginatedResponse(sanitizedUsers, page, limit, total);
};
