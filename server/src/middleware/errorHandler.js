import { logger } from '../utils/logger.js';
import { AppError } from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Handle known AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details || [],
      },
    });
  }

  // Handle validation errors (express-validator)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: err.errors || [],
      },
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid authentication token',
        details: [],
      },
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: {
        code: 'TOKEN_EXPIRED',
        message: 'Authentication token has expired',
        details: [],
      },
    });
  }

  // Handle database errors
  if (err.code && err.code.startsWith('23')) {
    let message = 'Database constraint violation';
    
    if (err.code === '23505') {
      message = 'Resource already exists';
    } else if (err.code === '23503') {
      message = 'Related resource not found';
    }

    return res.status(409).json({
      error: {
        code: 'DATABASE_CONFLICT',
        message,
        details: [],
      },
    });
  }

  // Handle unexpected errors (500)
  return res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : err.message,
      details: [],
    },
  });
};
