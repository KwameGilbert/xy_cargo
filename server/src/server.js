import app from './app.js';
import config from './config/index.js';
import { logger } from './utils/logger.js';

const PORT = config.port;
const HOST = config.host;

// Start server
const server = app.listen(PORT, HOST, () => {
  logger.info(`🚀 Server running in ${config.env} mode`);
  logger.info(`📡 Listening on http://${HOST}:${PORT}`);
  logger.info(`📚 API Base URL: http://${HOST}:${PORT}/api/v1`);
  logger.info(`💚 Health check: http://${HOST}:${PORT}/health`);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  logger.info(`\n${signal} received. Starting graceful shutdown...`);
  
  server.close(() => {
    logger.info('✅ Server closed successfully');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('⚠️ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

export default server;
