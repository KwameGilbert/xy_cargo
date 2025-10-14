# Implementation Guide

Step-by-step guide to implement features in the XY Cargo backend.

## 📖 Table of Contents

1. [Complete Example: Implement Parcel Features](#complete-example-implement-parcel-features)
2. [Adding a New Resource](#adding-a-new-resource)
3. [Common Patterns](#common-patterns)
4. [Testing](#testing)
5. [Best Practices](#best-practices)

---

## Complete Example: Implement Parcel Features

Let's implement the complete parcel functionality as an example.

### Step 1: Implement the Model Layer

**File**: `src/models/parcel.model.js`

```javascript
import { query } from '../config/database.js';

/**
 * Find all parcels with filters
 */
export const findAll = async ({ status, customer_id, limit, offset }) => {
  let queryText = `
    SELECT p.*, c.customer_code, c.full_name as customer_name
    FROM parcels p
    JOIN customers c ON p.customer_id = c.id
    WHERE 1=1
  `;
  const params = [];
  let paramCount = 1;

  if (status) {
    queryText += ` AND p.status = $${paramCount++}`;
    params.push(status);
  }

  if (customer_id) {
    queryText += ` AND p.customer_id = $${paramCount++}`;
    params.push(customer_id);
  }

  // Get total count
  const countResult = await query(
    queryText.replace('SELECT p.*, c.customer_code, c.full_name as customer_name', 'SELECT COUNT(*)'),
    params
  );
  const total = parseInt(countResult.rows[0].count, 10);

  // Get paginated results
  queryText += ` ORDER BY p.created_at DESC LIMIT $${paramCount++} OFFSET $${paramCount++}`;
  params.push(limit, offset);

  const result = await query(queryText, params);

  return {
    parcels: result.rows,
    total,
  };
};

/**
 * Find parcel by ID
 */
export const findById = async (parcelId) => {
  const result = await query(
    `SELECT p.*, c.customer_code, c.full_name as customer_name
     FROM parcels p
     JOIN customers c ON p.customer_id = c.id
     WHERE p.id = $1`,
    [parcelId]
  );
  return result.rows[0];
};

/**
 * Create new parcel
 */
export const create = async (parcelData) => {
  const { customer_id, tracking_number, weight, description } = parcelData;
  
  const result = await query(
    `INSERT INTO parcels (customer_id, tracking_number, weight, description, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, 'RECEIVED', NOW(), NOW())
     RETURNING *`,
    [customer_id, tracking_number || generateTrackingNumber(), weight, description]
  );
  
  return result.rows[0];
};

/**
 * Update parcel
 */
export const update = async (parcelId, updates) => {
  const { status, weight, notes } = updates;
  
  const result = await query(
    `UPDATE parcels 
     SET status = COALESCE($1, status),
         weight = COALESCE($2, weight),
         notes = COALESCE($3, notes),
         updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [status, weight, notes, parcelId]
  );
  
  return result.rows[0];
};

/**
 * Delete parcel
 */
export const remove = async (parcelId) => {
  await query('DELETE FROM parcels WHERE id = $1', [parcelId]);
};

/**
 * Helper to generate tracking number
 */
function generateTrackingNumber() {
  return 'TR' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
}
```

### Step 2: Implement the Service Layer

**Update**: `src/services/parcel.service.js`

```javascript
import { AppError } from '../utils/AppError.js';
import { parsePagination, paginatedResponse } from '../utils/pagination.js';
import * as parcelModel from '../models/parcel.model.js';
import * as customerModel from '../models/customer.model.js';

export const getAllParcels = async (filters) => {
  const { page, limit, offset } = parsePagination(filters);
  const { parcels, total } = await parcelModel.findAll({ 
    ...filters, 
    limit, 
    offset 
  });
  return paginatedResponse(parcels, page, limit, total);
};

export const createParcel = async (parcelData) => {
  // Validate customer exists
  const customer = await customerModel.findById(parcelData.customer_id);
  if (!customer) {
    throw new AppError('Customer not found', 404, 'CUSTOMER_NOT_FOUND');
  }

  // Create parcel
  const parcel = await parcelModel.create(parcelData);
  
  // TODO: Send notification to customer
  
  return parcel;
};

export const getParcelById = async (parcelId) => {
  const parcel = await parcelModel.findById(parcelId);
  
  if (!parcel) {
    throw new AppError('Parcel not found', 404, 'PARCEL_NOT_FOUND');
  }
  
  return parcel;
};

export const updateParcel = async (parcelId, updates) => {
  const parcel = await parcelModel.findById(parcelId);
  
  if (!parcel) {
    throw new AppError('Parcel not found', 404, 'PARCEL_NOT_FOUND');
  }
  
  const updated = await parcelModel.update(parcelId, updates);
  
  // TODO: Send notification if status changed
  
  return updated;
};

export const deleteParcel = async (parcelId) => {
  const parcel = await parcelModel.findById(parcelId);
  
  if (!parcel) {
    throw new AppError('Parcel not found', 404, 'PARCEL_NOT_FOUND');
  }
  
  // Check if parcel can be deleted (business rule)
  if (parcel.status === 'DELIVERED') {
    throw new AppError(
      'Cannot delete delivered parcel', 
      400, 
      'CANNOT_DELETE_DELIVERED'
    );
  }
  
  await parcelModel.remove(parcelId);
};
```

### Step 3: Test Your Implementation

**File**: `src/__tests__/parcel.test.js`

```javascript
import request from 'supertest';
import app from '../app.js';

describe('Parcel API', () => {
  let authToken;
  let parcelId;

  beforeAll(async () => {
    // Login to get token
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      });
    authToken = response.body.token;
  });

  describe('POST /api/v1/parcels', () => {
    it('should create a new parcel', async () => {
      const response = await request(app)
        .post('/api/v1/parcels')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          customer_id: 1,
          weight: 5.5,
          description: 'Test parcel'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.weight).toBe(5.5);
      parcelId = response.body.id;
    });

    it('should reject invalid customer_id', async () => {
      const response = await request(app)
        .post('/api/v1/parcels')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          customer_id: 9999,
          weight: 5.5
        });

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/v1/parcels/:id', () => {
    it('should get parcel by id', async () => {
      const response = await request(app)
        .get(`/api/v1/parcels/${parcelId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(parcelId);
    });
  });

  describe('PATCH /api/v1/parcels/:id', () => {
    it('should update parcel', async () => {
      const response = await request(app)
        .patch(`/api/v1/parcels/${parcelId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'IN_TRANSIT'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('IN_TRANSIT');
    });
  });
});
```

---

## Adding a New Resource

Example: Add "Categories" resource

### 1. Create the Model

**File**: `src/models/category.model.js`

```javascript
import { query } from '../config/database.js';

export const findAll = async () => {
  const result = await query('SELECT * FROM categories ORDER BY name');
  return result.rows;
};

export const findById = async (id) => {
  const result = await query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0];
};

export const create = async (data) => {
  const { name, description } = data;
  const result = await query(
    'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
};

export const update = async (id, data) => {
  const { name, description } = data;
  const result = await query(
    `UPDATE categories 
     SET name = COALESCE($1, name),
         description = COALESCE($2, description)
     WHERE id = $3
     RETURNING *`,
    [name, description, id]
  );
  return result.rows[0];
};

export const remove = async (id) => {
  await query('DELETE FROM categories WHERE id = $1', [id]);
};
```

### 2. Create the Service

**File**: `src/services/category.service.js`

```javascript
import { AppError } from '../utils/AppError.js';
import * as categoryModel from '../models/category.model.js';

export const getAllCategories = async () => {
  return await categoryModel.findAll();
};

export const getCategoryById = async (id) => {
  const category = await categoryModel.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
  }
  return category;
};

export const createCategory = async (data) => {
  return await categoryModel.create(data);
};

export const updateCategory = async (id, data) => {
  const category = await categoryModel.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
  }
  return await categoryModel.update(id, data);
};

export const deleteCategory = async (id) => {
  const category = await categoryModel.findById(id);
  if (!category) {
    throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
  }
  await categoryModel.remove(id);
};
```

### 3. Create the Controller

**File**: `src/controllers/category.controller.js`

```javascript
import { successResponse, createdResponse, noContentResponse } from '../utils/response.js';
import * as categoryService from '../services/category.service.js';

export const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  successResponse(res, categories);
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(id);
  successResponse(res, category);
};

export const createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  createdResponse(res, category);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.updateCategory(id, req.body);
  successResponse(res, category);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await categoryService.deleteCategory(id);
  noContentResponse(res);
};
```

### 4. Create the Routes

**File**: `src/routes/category.routes.js`

```javascript
import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import * as categoryController from '../controllers/category.controller.js';

const router = express.Router();

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.post(
  '/',
  [
    authenticate,
    authorize('admin'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').optional().trim(),
    validate,
  ],
  categoryController.createCategory
);

router.patch(
  '/:id',
  [
    authenticate,
    authorize('admin'),
    body('name').optional().trim().notEmpty(),
    body('description').optional().trim(),
    validate,
  ],
  categoryController.updateCategory
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  categoryController.deleteCategory
);

export default router;
```

### 5. Register the Routes

**Update**: `src/routes/index.js`

```javascript
import categoryRoutes from './category.routes.js';

// ... existing imports ...

router.use('/categories', categoryRoutes);

// Update the API info
router.get('/', (req, res) => {
  res.json({
    // ... existing endpoints ...
    categories: '/api/v1/categories',  // Add this
  });
});
```

---

## Common Patterns

### Pattern 1: List with Pagination

```javascript
// Service
export const getAll = async (filters) => {
  const { page, limit, offset } = parsePagination(filters);
  const { items, total } = await model.findAll({ limit, offset });
  return paginatedResponse(items, page, limit, total);
};

// Controller
export const getAll = async (req, res) => {
  const result = await service.getAll(req.query);
  successResponse(res, result);
};
```

### Pattern 2: Create with Validation

```javascript
// Service
export const create = async (data) => {
  // Validate business rules
  if (await model.findByName(data.name)) {
    throw new AppError('Name already exists', 409, 'DUPLICATE_NAME');
  }
  
  const item = await model.create(data);
  
  // Send notification, log event, etc.
  
  return item;
};

// Controller
export const create = async (req, res) => {
  const item = await service.create(req.body);
  createdResponse(res, item);
};
```

### Pattern 3: Update with Ownership Check

```javascript
// Service
export const update = async (userId, itemId, updates) => {
  const item = await model.findById(itemId);
  
  if (!item) {
    throw new AppError('Not found', 404, 'NOT_FOUND');
  }
  
  // Check ownership
  if (item.user_id !== userId) {
    throw new AppError('Forbidden', 403, 'FORBIDDEN');
  }
  
  return await model.update(itemId, updates);
};

// Controller
export const update = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const item = await service.update(userId, id, req.body);
  successResponse(res, item);
};
```

### Pattern 4: Transaction Example

```javascript
import { transaction } from '../config/database.js';

export const transferParcel = async (parcelId, fromCustomer, toCustomer) => {
  return await transaction(async (client) => {
    // Update parcel
    await client.query(
      'UPDATE parcels SET customer_id = $1 WHERE id = $2',
      [toCustomer, parcelId]
    );
    
    // Log transfer
    await client.query(
      'INSERT INTO transfer_logs (parcel_id, from_customer, to_customer) VALUES ($1, $2, $3)',
      [parcelId, fromCustomer, toCustomer]
    );
    
    // Auto-commits if no errors
  });
};
```

---

## Testing

### Unit Test (Service)

```javascript
import { jest } from '@jest/globals';
import * as service from '../services/resource.service.js';
import * as model from '../models/resource.model.js';

jest.mock('../models/resource.model.js');

describe('Resource Service', () => {
  it('should get all resources', async () => {
    model.findAll.mockResolvedValue({ items: [], total: 0 });
    const result = await service.getAll({});
    expect(result).toHaveProperty('items');
    expect(result).toHaveProperty('pagination');
  });
});
```

### Integration Test (API)

```javascript
import request from 'supertest';
import app from '../app.js';

describe('Resource API', () => {
  it('GET /api/v1/resources should return 200', async () => {
    const response = await request(app).get('/api/v1/resources');
    expect(response.status).toBe(200);
  });
});
```

---

## Best Practices

### ✅ DO

1. **Validate input** at both route and service level
2. **Use transactions** for multiple database operations
3. **Handle errors** with meaningful messages
4. **Log important events** (auth, errors, critical operations)
5. **Check permissions** before operations
6. **Use pagination** for list endpoints
7. **Return consistent responses** using response helpers
8. **Document your code** with JSDoc comments

### ❌ DON'T

1. **Don't put business logic** in controllers
2. **Don't execute queries** in controllers
3. **Don't use raw SQL concatenation** (SQL injection risk)
4. **Don't expose sensitive data** in responses or logs
5. **Don't ignore errors** or swallow exceptions
6. **Don't skip authentication** checks
7. **Don't return different error formats**
8. **Don't forget to close database connections** (use pool)

---

## Checklist for New Feature

- [ ] Create model with database queries
- [ ] Create service with business logic
- [ ] Create controller with request handling
- [ ] Create routes with validation
- [ ] Register routes in main router
- [ ] Add authentication/authorization
- [ ] Add input validation rules
- [ ] Write unit tests for service
- [ ] Write integration tests for routes
- [ ] Update API documentation
- [ ] Test manually with Postman/curl
- [ ] Review error handling
- [ ] Check logging is appropriate
- [ ] Verify security (auth, validation, SQL injection)

---

**🎓 Follow these patterns and your implementation will be clean, maintainable, and secure!**
