import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ "path": `.env.${process.env.NODE_ENV || 'development'}.local` });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'xy_cargo',
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'your_default_secret_key_for_dev',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
};

// Validate critical config
if (config.env === 'production' && config.jwt.secret === 'your_default_secret_key_for_dev') {
  throw new Error('JWT_SECRET must be defined in production environment');
}

export default config;