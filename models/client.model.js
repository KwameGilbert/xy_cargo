import db from '../config/database.js';

// Create user
export const createClient = async (clientData) => {
  const sql = `
    INSERT INTO client (email, password, first_name, last_name, roles)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [
    clientData.email,
    clientData.password,
    clientData.firstName,
    clientData.lastName,
    JSON.stringify(clientData.roles || ['customer']),
  ];
  
  const result = await db.query(sql, params);
  return { id: result.insertId, ...clientData };
};

// Find client by email
export const findByEmail = async (email) => {
  const sql = 'SELECT * FROM client WHERE email = ?';
  const clients = await db.query(sql, [email]);

  if (clients.length === 0) {
    return null;
  }

  const client = clients[0];
  // Parse roles from JSON string
  client.roles = JSON.parse(client.roles || '[]');

  return client;
};

// Find client by ID
export const findById = async (id) => {
  const sql = 'SELECT * FROM client WHERE id = ?';
  const clients = await db.query(sql, [id]);

  if (clients.length === 0) {
    return null;
  }

  const client = clients[0];
  // Parse roles from JSON string
  client.roles = JSON.parse(client.roles || '[]');

  return client;
};

// Update client
export const update = async (id, clientData) => {
  const fields = Object.keys(clientData)
    .filter(key => clientData[key] !== undefined)
    .map(key => {
      // Handle special case for roles which needs to be JSON stringified
      if (key === 'roles' && Array.isArray(clientData[key])) {
        return `${key} = ?`;
      }
      return `${key} = ?`;
    })
    .join(', ');
  
  const values = Object.keys(userData)
    .filter(key => userData[key] !== undefined)
    .map(key => {
      // Handle special case for roles which needs to be JSON stringified
      if (key === 'roles' && Array.isArray(userData[key])) {
        return JSON.stringify(userData[key]);
      }
      return userData[key];
    });
  
  // Add id to values array
  values.push(id);
  
  const sql = `UPDATE client SET ${fields} WHERE id = ?`;
  await db.query(sql, values);
  
  return findById(id);
};

// Delete user
export const remove = async (id) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  await db.query(sql, [id]);
  return { success: true };
};

// List users with pagination
export const findAll = async (options = {}) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const offset = (page - 1) * limit;
  
  const sql = 'SELECT * FROM users LIMIT ? OFFSET ?';
  const countSql = 'SELECT COUNT(*) as total FROM users';
  
  const users = await db.query(sql, [limit, offset]);
  const countResult = await db.query(countSql);
  const total = countResult[0].total;
  
  // Parse roles for each user
  users.forEach(user => {
    user.roles = JSON.parse(user.roles || '[]');
  });
  
  return {
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export default {
  create,
  findByEmail,
  findById,
  update,
  remove,
  findAll,
};