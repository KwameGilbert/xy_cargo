import { validationResult } from 'express-validator';
import { AppError } from '../utils/AppError.js';

/**
 * Middleware to handle validation errors from express-validator
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const details = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value,
    }));

    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR', details);
  }
  
  next();
};
