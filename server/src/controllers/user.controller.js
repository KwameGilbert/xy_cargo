import { successResponse } from '../utils/response.js';
import * as userService from '../services/user.service.js';

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;
  const user = await userService.getUserById(userId);
  successResponse(res, user);
};

/**
 * Update current user profile
 */
export const updateCurrentUser = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;
  const user = await userService.updateUser(userId, updates);
  successResponse(res, user);
};

/**
 * Get user by ID (admin)
 */
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  successResponse(res, user);
};

/**
 * Get all users (admin)
 */
export const getAllUsers = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const result = await userService.getAllUsers({ page, limit });
  successResponse(res, result);
};
