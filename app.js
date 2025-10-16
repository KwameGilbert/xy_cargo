import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import 'express-async-errors';

import config from './config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();

// Response compression
app.use(compression());
app.use(requestLogger);
// Security middleware
app.use(helmet());
app.use(cors(config.cors));

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api', rateLimiter);

// API routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'XY Cargo API is running',
    timestamp: new Date().toISOString(),
    environment: config.env
  });
});

// Handle 404 routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;