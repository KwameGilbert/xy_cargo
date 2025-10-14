/**
 * Wrapper for async route handlers to catch errors
 * Note: express-async-errors package is already handling this globally,
 * but this utility is provided for manual wrapping if needed
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
