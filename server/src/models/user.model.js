import { query } from '../config/database.js';
import { AppError } from '../utils/AppError.js';

/**
 * Find user by ID
 */
export const findById = async (userId) => {
  const result = await query(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );
  return result.rows[0];
};

/**
 * Find user by email
 */
export const findByEmail = async (email) => {
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

/**
 * Create new user
 */
export const create = async (userData) => {
  const { full_name, email, password_hash, phone, account_type } = userData;
  
  // TODO: Implement proper user and customer creation with transaction
  const result = await query(
    `INSERT INTO users (full_name, email, password_hash, phone, created_at, updated_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())
     RETURNING *`,
    [full_name, email, password_hash, phone]
  );
  
  return result.rows[0];
};

/**
 * Update user
 */
export const update = async (userId, updates) => {
  const { full_name, phone, preferred_language } = updates;
  
  const result = await query(
    `UPDATE users 
     SET full_name = COALESCE($1, full_name),
         phone = COALESCE($2, phone),
         preferred_language = COALESCE($3, preferred_language),
         updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [full_name, phone, preferred_language, userId]
  );
  
  return result.rows[0];
};

/**
 * Find all users with pagination
 */
export const findAll = async ({ limit, offset }) => {
  const countResult = await query('SELECT COUNT(*) FROM users');
  const total = parseInt(countResult.rows[0].count, 10);
  
  const result = await query(
    'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  
  return {
    users: result.rows,
    total,
  };
};
