import rateLimit from 'express-rate-limit';
import config from '../config/config.js';

// Configure different limits based on environment
const getMaxRequests = () => {
  switch(config.env) {
    case 'production':
      return 100;
    case 'staging':
      return 200;
    default:
      return 300; // More generous for development
  }
};

// Create rate limiter middleware
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: getMaxRequests(),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skipSuccessfulRequests: false, // Count successful requests against the rate limit
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.',
      details: {
        retryAfter: '15 minutes',
      }
    }
  },
  // Custom handler function (optional)
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});

// More strict rate limiter for authentication routes
export const authRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts, please try again later.',
      details: {
        retryAfter: '60 minutes',
      }
    }
  }
});

export default rateLimiter;