import http from 'http';
import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';

const PORT = config.port || 5000;

const server = http.createServer(app);

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(error.name, error.message);
  process.exit(1);
});

// Start server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});