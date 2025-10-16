/**
 * Wraps an async function to automatically catch errors and pass them to next()
 * This eliminates the need for try/catch blocks in route handlers
 * 
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;

/**
 * Wrapper for controller functions that can be used with express-validator
 * This allows us to use async/await in route handlers without try/catch blocks
 * and also supports validation middleware
 * 
 * @example
 * // Usage with express-validator
 * router.post(
 *   '/users',
 *   [
 *     body('email').isEmail(),
 *     body('name').notEmpty(),
 *     validate
 *   ],
 *   withValidation(userController.createUser)
 * );
 * 
 * @param {Function} fn - Controller function to wrap
 * @returns {Function} Express middleware function
 */
export const withValidation = (fn) => {
  return asyncHandler(fn);
};