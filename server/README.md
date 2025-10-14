# XY Cargo Server

Modern, modularized Express.js backend for the XY Cargo logistics platform.

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── index.js      # Main config with environment variables
│   │   └── database.js   # Database connection and query helpers
│   ├── middleware/       # Express middleware
│   │   ├── auth.js       # JWT authentication & authorization
│   │   ├── errorHandler.js  # Global error handling
│   │   ├── notFoundHandler.js  # 404 handler
│   │   ├── rateLimiter.js   # Rate limiting
│   │   ├── requestLogger.js # Request logging
│   │   └── validate.js   # Input validation
│   ├── routes/           # API route definitions
│   │   ├── index.js      # Main router combining all routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── customer.routes.js
│   │   ├── parcel.routes.js
│   │   ├── address.routes.js
│   │   ├── warehouse.routes.js
│   │   ├── shipment.routes.js
│   │   ├── tracking.routes.js
│   │   ├── invoice.routes.js
│   │   ├── payment.routes.js
│   │   ├── claim.routes.js
│   │   ├── notification.routes.js
│   │   └── dashboard.routes.js
│   ├── controllers/      # Request handlers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── customer.controller.js
│   │   ├── parcel.controller.js
│   │   ├── address.controller.js
│   │   ├── warehouse.controller.js
│   │   ├── shipment.controller.js
│   │   ├── tracking.controller.js
│   │   ├── invoice.controller.js
│   │   ├── payment.controller.js
│   │   ├── claim.controller.js
│   │   ├── notification.controller.js
│   │   └── dashboard.controller.js
│   ├── services/         # Business logic layer
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── customer.service.js
│   │   ├── parcel.service.js
│   │   ├── address.service.js
│   │   ├── warehouse.service.js
│   │   ├── shipment.service.js
│   │   ├── tracking.service.js
│   │   ├── invoice.service.js
│   │   ├── payment.service.js
│   │   ├── claim.service.js
│   │   ├── notification.service.js
│   │   └── dashboard.service.js
│   ├── models/           # Database models/queries
│   │   ├── user.model.js
│   │   └── customer.model.js
│   ├── utils/            # Utility functions
│   │   ├── logger.js     # Logging utility
│   │   ├── AppError.js   # Custom error class
│   │   ├── asyncHandler.js  # Async error wrapper
│   │   ├── jwt.js        # JWT token utilities
│   │   ├── pagination.js # Pagination helpers
│   │   ├── password.js   # Password hashing utilities
│   │   └── response.js   # Standard response helpers
│   ├── validators/       # Input validation schemas (to be added)
│   ├── types/            # TypeScript types/JSDoc (to be added)
│   ├── app.js            # Express app configuration
│   └── server.js         # Server entry point
├── .env.example          # Example environment variables
├── package.json          # Dependencies and scripts
├── api_spec.md           # API specification
├── schema.sql            # Database schema
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.x
- PostgreSQL >= 12.x
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   - Database credentials
   - JWT secrets
   - CORS origins
   - etc.

3. **Set up the database**
   ```bash
   # Create database
   createdb xy_cargo
   
   # Run schema
   psql xy_cargo < schema.sql
   ```

4. **Start the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## 📚 API Documentation

The API follows RESTful conventions and is documented in [`api_spec.md`](./api_spec.md).

### Base URL
```
http://localhost:5000/api/v1
```

### Health Check
```
GET /health
```

### API Info
```
GET /api/v1
```

### Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 🔑 Key Features

### 1. **Modular Architecture**
- Clear separation of concerns (routes → controllers → services → models)
- Easy to maintain, test, and scale
- Follows industry best practices

### 2. **Security**
- JWT-based authentication
- Role-based access control (RBAC)
- Helmet for security headers
- Rate limiting
- Input validation
- Password hashing with bcrypt

### 3. **Database**
- PostgreSQL with connection pooling
- Transaction support
- Query helpers
- Safe parameterized queries

### 4. **Error Handling**
- Centralized error handling
- Custom error classes
- Consistent error responses
- Detailed logging

### 5. **Validation**
- express-validator for input validation
- Consistent validation patterns
- Clear error messages

### 6. **Logging**
- Request/response logging
- Error logging
- Configurable log levels
- Development-friendly output

### 7. **CORS & Compression**
- Configurable CORS
- Response compression
- Performance optimized

## 🛠️ Development

### Available Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with auto-reload
npm test         # Run tests
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Adding New Features

To add a new feature/resource:

1. **Create route file** in `src/routes/`
2. **Create controller** in `src/controllers/`
3. **Create service** in `src/services/`
4. **Create model** in `src/models/` (if needed)
5. **Register route** in `src/routes/index.js`
6. **Add validation** using express-validator

Example structure:
```javascript
// routes/resource.routes.js
import express from 'express';
import * as resourceController from '../controllers/resource.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
router.get('/', authenticate, resourceController.getAll);
router.post('/', authenticate, resourceController.create);
export default router;

// controllers/resource.controller.js
import * as resourceService from '../services/resource.service.js';
export const getAll = async (req, res) => {
  const result = await resourceService.getAll();
  res.json(result);
};

// services/resource.service.js
import * as resourceModel from '../models/resource.model.js';
export const getAll = async () => {
  return await resourceModel.findAll();
};

// models/resource.model.js
import { query } from '../config/database.js';
export const findAll = async () => {
  const result = await query('SELECT * FROM resources');
  return result.rows;
};
```

## 🧪 Testing

```bash
npm test
```

Tests should be placed in a `__tests__` directory next to the code they test.

## 📝 Environment Variables

See [`.env.example`](./.env.example) for all available configuration options.

Key variables:
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `DB_*` - Database configuration
- `JWT_SECRET` - JWT signing secret (required in production)
- `CORS_ORIGIN` - Allowed CORS origins

## 🔐 Authentication & Authorization

### Roles
- `customer` - End users/clients
- `warehouse_staff` - Warehouse operations
- `admin` - Full system access
- `agent` - Business agents

### Protected Routes
Use the `authenticate` and `authorize` middleware:

```javascript
router.get('/', 
  authenticate, 
  authorize('admin', 'warehouse_staff'),
  controller.handler
);
```

## 📊 Database

The database schema is defined in [`schema.sql`](./schema.sql).

### Connection Pooling
The app uses pg connection pooling for optimal performance.

### Transactions
Use the transaction helper for multi-query operations:

```javascript
import { transaction } from '../config/database.js';

await transaction(async (client) => {
  await client.query('INSERT INTO table1 ...');
  await client.query('UPDATE table2 ...');
});
```

## 🚦 API Response Format

### Success Response
```json
{
  "id": 1,
  "name": "Resource",
  ...
}
```

### List Response (with pagination)
```json
{
  "items": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": [
      {
        "field": "email",
        "message": "Invalid format"
      }
    ]
  }
}
```

## 🐛 Debugging

Set `LOG_LEVEL=debug` in `.env` for verbose logging.

## 📦 Deployment

1. Set `NODE_ENV=production`
2. Configure production database
3. Set strong JWT secrets
4. Configure CORS for production domains
5. Set up process manager (PM2, systemd, etc.)
6. Use reverse proxy (nginx, Apache)
7. Enable SSL/TLS

## 🤝 Contributing

1. Follow the existing code structure
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation
5. Follow ESLint rules

## 📄 License

[Add your license here]

## 👥 Support

For issues and questions, contact [your contact information]
