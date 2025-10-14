import { AppError } from '../utils/AppError.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt.js';
import * as userModel from '../models/user.model.js';

/**
 * Login user with email and password
 */
export const login = async (email, password) => {
  // Find user by email
  const user = await userModel.findByEmail(email);
  
  if (!user) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  // Verify password
  const isValidPassword = await comparePassword(password, user.password_hash);
  
  if (!isValidPassword) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  // Generate tokens
  const payload = {
    id: user.id,
    email: user.email,
    roles: user.roles || [],
  };
  
  const { accessToken, refreshToken } = generateTokenPair(payload);

  // Return user data and tokens
  return {
    token: accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      roles: user.roles || [],
    },
  };
};

/**
 * Register new user
 */
export const signup = async (userData) => {
  // Check if user already exists
  const existingUser = await userModel.findByEmail(userData.email);
  
  if (existingUser) {
    throw new AppError('Email already registered', 409, 'EMAIL_EXISTS');
  }

  // Hash password
  const passwordHash = await hashPassword(userData.password);

  // Create user and customer record
  const newUser = await userModel.create({
    full_name: userData.full_name,
    email: userData.email,
    password_hash: passwordHash,
    phone: userData.phone,
    account_type: userData.account_type || 'Individual',
  });

  return {
    id: newUser.id,
    customer_code: newUser.customer_code,
  };
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);
    
    // Generate new access token
    const payload = {
      id: decoded.id,
      email: decoded.email,
      roles: decoded.roles,
    };
    
    const { accessToken } = generateTokenPair(payload);
    
    return { token: accessToken };
  } catch (error) {
    throw new AppError('Invalid or expired refresh token', 401, 'INVALID_REFRESH_TOKEN');
  }
};

/**
 * Setup 2FA for user
 */
export const setup2FA = async (userId) => {
  // TODO: Implement 2FA setup with TOTP
  // Generate secret, create QR code, etc.
  throw new AppError('2FA setup not yet implemented', 501, 'NOT_IMPLEMENTED');
};

/**
 * Verify 2FA code
 */
export const verify2FA = async (userId, code) => {
  // TODO: Implement 2FA verification
  throw new AppError('2FA verification not yet implemented', 501, 'NOT_IMPLEMENTED');
};
