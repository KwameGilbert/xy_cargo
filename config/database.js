import mysql from 'mysql2/promise';
import config from './index.js';
import logger from '../utils/logger.js';

// Create connection pool
const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    logger.info('MySQL connection established successfully');
    connection.release();
    return true;
  } catch (error) {
    logger.error('Error connecting to MySQL database:', error.message);
    return false;
  }
}

// Execute query helper
async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    logger.error(`Query error: ${error.message}`);
    logger.error(`SQL: ${sql}`);
    logger.error(`Params: ${JSON.stringify(params)}`);
    throw error;
  }
}

// Transaction helper
async function transaction(callback) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  
  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export default {
  pool,
  query,
  transaction,
  testConnection,
};