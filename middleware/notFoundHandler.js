import { AppError } from '../utils/AppError.js';

/**
 * Middleware for handling 404 Not Found errors
 * This should be placed after all defined routes
 */
export const notFoundHandler = (req, res, next) => {
  const path = req.originalUrl;
  throw new AppError(`Resource not found: ${path}`, 404, 'NOT_FOUND');
};