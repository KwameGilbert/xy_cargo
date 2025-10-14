import { AppError } from '../utils/AppError.js';
import { successResponse, createdResponse, noContentResponse } from '../utils/response.js';
import * as authService from '../services/auth.service.js';

/**
 * Login user
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  successResponse(res, result);
};

/**
 * Signup new user
 */
export const signup = async (req, res) => {
  const userData = req.body;
  const result = await authService.signup(userData);
  createdResponse(res, result);
};

/**
 * Refresh access token
 */
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    throw new AppError('Refresh token is required', 400, 'MISSING_REFRESH_TOKEN');
  }

  const result = await authService.refreshAccessToken(refreshToken);
  successResponse(res, result);
};

/**
 * Logout user
 */
export const logout = async (req, res) => {
  // In a stateless JWT setup, logout is handled on the client side
  // If using token blacklisting or refresh token rotation, implement here
  noContentResponse(res);
};

/**
 * Setup 2FA for user
 */
export const setup2FA = async (req, res) => {
  const userId = req.user.id;
  const result = await authService.setup2FA(userId);
  successResponse(res, result);
};

/**
 * Verify 2FA code
 */
export const verify2FA = async (req, res) => {
  const { code } = req.body;
  const userId = req.user.id;
  const result = await authService.verify2FA(userId, code);
  successResponse(res, result);
};
