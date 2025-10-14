import { query } from '../config/database.js';

/**
 * Find all customers with filters and pagination
 */
export const findAll = async ({ account_type, verification_status, limit, offset }) => {
  let queryText = 'SELECT * FROM customers WHERE 1=1';
  const params = [];
  let paramCount = 1;

  if (account_type) {
    queryText += ` AND account_type = $${paramCount++}`;
    params.push(account_type);
  }

  if (verification_status) {
    queryText += ` AND verification_status = $${paramCount++}`;
    params.push(verification_status);
  }

  // Get total count
  const countResult = await query(
    queryText.replace('SELECT *', 'SELECT COUNT(*)'),
    params
  );
  const total = parseInt(countResult.rows[0].count, 10);

  // Get paginated results
  queryText += ` ORDER BY created_at DESC LIMIT $${paramCount++} OFFSET $${paramCount++}`;
  params.push(limit, offset);

  const result = await query(queryText, params);

  return {
    customers: result.rows,
    total,
  };
};

/**
 * Find customer by ID
 */
export const findById = async (customerId) => {
  const result = await query(
    'SELECT * FROM customers WHERE id = $1',
    [customerId]
  );
  return result.rows[0];
};

/**
 * Create new customer
 */
export const create = async (customerData) => {
  // TODO: Implement customer creation
  const result = await query(
    `INSERT INTO customers (customer_code, account_type, verification_status, created_at, updated_at)
     VALUES ($1, $2, $3, NOW(), NOW())
     RETURNING *`,
    ['CUST-' + Date.now(), customerData.account_type || 'Individual', 'Pending']
  );
  return result.rows[0];
};

/**
 * Update customer
 */
export const update = async (customerId, updates) => {
  const { verification_status } = updates;
  
  const result = await query(
    `UPDATE customers 
     SET verification_status = COALESCE($1, verification_status),
         updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [verification_status, customerId]
  );
  
  return result.rows[0];
};

/**
 * Get customer parcels
 */
export const getParcels = async (customerId) => {
  const result = await query(
    'SELECT * FROM parcels WHERE customer_id = $1 ORDER BY created_at DESC',
    [customerId]
  );
  return result.rows;
};
