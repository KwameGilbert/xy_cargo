import { validationResult } from 'express-validator';
import { AppError } from '../utils/AppError.js';

/**
 * Middleware to validate request inputs using express-validator
 * This middleware should be used after defining validation rules
 */
export const validate = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Format validation errors
    const formattedErrors = {};
    errors.array().forEach(error => {
      if (error.type === 'field') {
        formattedErrors[error.path] = error.msg;
      } else {
        // Handle non-field errors
        formattedErrors._error = error.msg;
      }
    });
    
    // Throw formatted error
    throw new AppError(
      'Validation failed',
      400,
      'VALIDATION_ERROR',
      formattedErrors
    );
  }
  
  next();
};

/**
 * Helper to create common validation checks for IDs
 */
export const validateId = (fieldName = 'id', location = 'params') => {
  return {
    in: [location],
    errorMessage: `${fieldName} must be a valid ID`,
    isInt: true,
    toInt: true,
  };
};

/**
 * Helper to create pagination validation
 */
export const validatePagination = [
  {
    in: ['query'],
    name: 'page',
    optional: true,
    isInt: {
      options: { min: 1 },
    },
    errorMessage: 'Page must be a positive integer',
    toInt: true,
  },
  {
    in: ['query'],
    name: 'limit',
    optional: true,
    isInt: {
      options: { min: 1, max: 100 },
    },
    errorMessage: 'Limit must be between 1 and 100',
    toInt: true,
  },
];