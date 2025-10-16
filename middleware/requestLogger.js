import logger from '../utils/logger.js';

/**
 * Middleware to log incoming requests
 */
export const requestLogger = (req, res, next) => {
  // Log the request
  const start = new Date();
  const requestId = req.headers['x-request-id'] || generateRequestId();
  
  // Attach request ID to the request object for use in other middleware
  req.requestId = requestId;
  
  // Log the request details
  logger.info(`[${requestId}] ${req.method} ${req.originalUrl} - Request received`);

  // Log request body if it exists (but sanitize sensitive information)
  if (req.body && Object.keys(req.body).length > 0) {
    const sanitizedBody = sanitizeBody(req.body);
    logger.debug(`[${requestId}] Request body: ${JSON.stringify(sanitizedBody)}`);
  }

  // Override res.end to log the response
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    // Calculate response time
    const responseTime = new Date() - start;
    
    // Determine log level based on status code
    const statusCode = res.statusCode;
    const logMethod = statusCode >= 500 ? 'error' : 
                      statusCode >= 400 ? 'warn' : 'info';

    // Log the response
    logger[logMethod](
      `[${requestId}] ${req.method} ${req.originalUrl} - ${statusCode} - ${responseTime}ms`
    );

    // Call the original end method
    return originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

/**
 * Generate a unique request ID
 */
function generateRequestId() {
  return `req-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

/**
 * Sanitize request body to remove sensitive information
 */
function sanitizeBody(body) {
  const sensitiveFields = ['password', 'token', 'secret', 'credit_card', 'cardNumber'];
  const sanitized = { ...body };
  
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '***REDACTED***';
    }
  }
  
  return sanitized;
}