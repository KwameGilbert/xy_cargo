import config from '../config/config.js';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

// Log levels with corresponding terminal colors
const levels = {
  error: { priority: 0, color: colors.red },
  warn: { priority: 1, color: colors.yellow },
  info: { priority: 2, color: colors.green },
  http: { priority: 3, color: colors.magenta },
  debug: { priority: 4, color: colors.cyan }
};

// Get the current log level from environment or default to 'info'
const getCurrentLevel = () => {
  const envLevel = (config?.logging?.level || 'info').toLowerCase();
  return Object.keys(levels).includes(envLevel) ? envLevel : 'info';
};

// Check if the message should be logged based on level priority
const shouldLog = (messageLevel) => {
  const currentLevel = getCurrentLevel();
  return levels[messageLevel].priority <= levels[currentLevel].priority;
};

// Format the log message with timestamp, level, and optional metadata
const formatMessage = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const color = levels[level].color;
  const levelFormatted = `${color}${level.toUpperCase()}${colors.reset}`;
  
  let formattedMessage = `[${timestamp}] ${levelFormatted}: ${message}`;
  
  // Add metadata if provided
  if (Object.keys(meta).length > 0) {
    formattedMessage += `\n${colors.dim}${JSON.stringify(meta, null, 2)}${colors.reset}`;
  }
  
  return formattedMessage;
};

// Create logger object with methods for each log level
const logger = {
  error: (message, meta) => {
    if (shouldLog('error')) {
      console.error(formatMessage('error', message, meta));
    }
  },
  
  warn: (message, meta) => {
    if (shouldLog('warn')) {
      console.warn(formatMessage('warn', message, meta));
    }
  },
  
  info: (message, meta) => {
    if (shouldLog('info')) {
      console.log(formatMessage('info', message, meta));
    }
  },
  
  http: (message, meta) => {
    if (shouldLog('http')) {
      console.log(formatMessage('http', message, meta));
    }
  },
  
  debug: (message, meta) => {
    if (shouldLog('debug')) {
      console.log(formatMessage('debug', message, meta));
    }
  },
  
  // Allow direct log at a specific level
  log: (level, message, meta) => {
    if (Object.keys(levels).includes(level) && shouldLog(level)) {
      console.log(formatMessage(level, message, meta));
    }
  }
};

export default logger;