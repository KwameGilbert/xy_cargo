import { AppError } from '../utils/AppError.js';
import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  // Default error status and message
  let status = err.status || 500;
  let message = err.message || 'Something went wrong';
  let code = err.code || 'INTERNAL_SERVER_ERROR';
  let details = err.details || null;

  // Handle different types of errors
  if (err instanceof AppError) {
    // Custom application error
    status = err.status;
    message = err.message;
    code = err.code;
    details = err.details;
  } else if (err.name === 'ValidationError') {
    // Express-validator errors
    status = 400;
    message = 'Validation Error';
    code = 'VALIDATION_ERROR';
    details = err.errors;
  } else if (err.name === 'JsonWebTokenError') {
    // JWT errors
    status = 401;
    message = 'Invalid token';
    code = 'INVALID_TOKEN';
  } else if (err.name === 'TokenExpiredError') {
    // JWT expiration
    status = 401;
    message = 'Token expired';
    code = 'TOKEN_EXPIRED';
  } else if (err.code === 'ER_DUP_ENTRY') {
    // MySQL duplicate entry
    status = 409;
    message = 'Duplicate entry';
    code = 'DUPLICATE_ENTRY';
  }

  // Log error details
  if (status >= 500) {
    logger.error(`[${req.method}] ${req.path} >> ${status} ${message}`);
    logger.error(err.stack);
  } else {
    logger.warn(`[${req.method}] ${req.path} >> ${status} ${message}`);
  }

  // Send response
  res.status(status).json({
    error: {
      code,
      message,
      details,
    },
  });
};