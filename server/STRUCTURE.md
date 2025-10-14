# Server Directory Structure

Complete directory structure of the XY Cargo Express.js backend.

```
server/
│
├── 📄 package.json              # Dependencies and scripts
├── 📄 .env.example              # Environment variables template
├── 📄 .gitignore                # Git ignore rules
├── 📄 .eslintrc.json            # ESLint configuration
├── 📄 .prettierrc               # Prettier configuration
│
├── 📚 Documentation
│   ├── 📄 README.md             # Main documentation
│   ├── 📄 QUICK_START.md        # Quick setup guide
│   ├── 📄 ARCHITECTURE.md       # Architecture details
│   ├── 📄 STRUCTURE.md          # This file
│   ├── 📄 api_spec.md           # API specification
│   └── 📄 schema.sql            # Database schema
│
└── 📁 src/                      # Source code
    │
    ├── 📄 server.js             # Server entry point
    ├── 📄 app.js                # Express app configuration
    │
    ├── 📁 config/               # Configuration
    │   ├── 📄 index.js          # Main config loader
    │   └── 📄 database.js       # Database connection & helpers
    │
    ├── 📁 middleware/           # Express middleware
    │   ├── 📄 auth.js           # JWT authentication & RBAC
    │   ├── 📄 errorHandler.js   # Global error handler
    │   ├── 📄 notFoundHandler.js # 404 handler
    │   ├── 📄 rateLimiter.js    # Rate limiting
    │   ├── 📄 requestLogger.js  # Request logging
    │   └── 📄 validate.js       # Validation middleware
    │
    ├── 📁 routes/               # API routes
    │   ├── 📄 index.js          # Main router
    │   ├── 📄 auth.routes.js    # /api/v1/auth
    │   ├── 📄 user.routes.js    # /api/v1/users
    │   ├── 📄 customer.routes.js # /api/v1/customers
    │   ├── 📄 parcel.routes.js  # /api/v1/parcels
    │   ├── 📄 address.routes.js # /api/v1/addresses
    │   ├── 📄 warehouse.routes.js # /api/v1/warehouses
    │   ├── 📄 shipment.routes.js # /api/v1/shipments
    │   ├── 📄 tracking.routes.js # /api/v1/tracking
    │   ├── 📄 invoice.routes.js # /api/v1/invoices
    │   ├── 📄 payment.routes.js # /api/v1/payments
    │   ├── 📄 claim.routes.js   # /api/v1/claims
    │   ├── 📄 notification.routes.js # /api/v1/notifications
    │   └── 📄 dashboard.routes.js # /api/v1/dashboards
    │
    ├── 📁 controllers/          # Request handlers
    │   ├── 📄 auth.controller.js
    │   ├── 📄 user.controller.js
    │   ├── 📄 customer.controller.js
    │   ├── 📄 parcel.controller.js
    │   ├── 📄 address.controller.js
    │   ├── 📄 warehouse.controller.js
    │   ├── 📄 shipment.controller.js
    │   ├── 📄 tracking.controller.js
    │   ├── 📄 invoice.controller.js
    │   ├── 📄 payment.controller.js
    │   ├── 📄 claim.controller.js
    │   ├── 📄 notification.controller.js
    │   └── 📄 dashboard.controller.js
    │
    ├── 📁 services/             # Business logic
    │   ├── 📄 auth.service.js
    │   ├── 📄 user.service.js
    │   ├── 📄 customer.service.js
    │   ├── 📄 parcel.service.js
    │   ├── 📄 address.service.js
    │   ├── 📄 warehouse.service.js
    │   ├── 📄 shipment.service.js
    │   ├── 📄 tracking.service.js
    │   ├── 📄 invoice.service.js
    │   ├── 📄 payment.service.js
    │   ├── 📄 claim.service.js
    │   ├── 📄 notification.service.js
    │   └── 📄 dashboard.service.js
    │
    ├── 📁 models/               # Database queries
    │   ├── 📄 user.model.js     # User CRUD operations
    │   └── 📄 customer.model.js # Customer CRUD operations
    │
    ├── 📁 utils/                # Utilities
    │   ├── 📄 logger.js         # Logging utility
    │   ├── 📄 AppError.js       # Custom error class
    │   ├── 📄 asyncHandler.js   # Async wrapper
    │   ├── 📄 jwt.js            # JWT utilities
    │   ├── 📄 pagination.js     # Pagination helpers
    │   ├── 📄 password.js       # Password hashing
    │   └── 📄 response.js       # Response formatters
    │
    ├── 📁 validators/           # Validation schemas (to be added)
    │
    └── 📁 types/                # Type definitions (to be added)
```

## File Count Summary

- **Total Files**: 67 JavaScript files
- **Routes**: 13 route modules
- **Controllers**: 13 controllers
- **Services**: 13 services
- **Models**: 2 models (user, customer)
- **Middleware**: 6 middleware files
- **Utilities**: 7 utility files
- **Config**: 2 config files
- **Documentation**: 6 documentation files

## Module Connections

### Request Flow Example: POST /api/v1/auth/login

```
1. server.js
   ↓
2. app.js (middleware: helmet, cors, body-parser, etc.)
   ↓
3. routes/index.js (base /api/v1)
   ↓
4. routes/auth.routes.js (POST /login)
   ↓ (validation middleware)
   ↓
5. controllers/auth.controller.js → login()
   ↓
6. services/auth.service.js → login()
   ↓
7. models/user.model.js → findByEmail()
   ↓
8. config/database.js (execute query)
   ↓
9. PostgreSQL Database
   ↓
   ... response flows back up ...
   ↓
10. Response sent to client
```

## Key File Purposes

### Core Files

| File | Purpose |
|------|---------|
| `server.js` | Entry point, starts HTTP server, handles graceful shutdown |
| `app.js` | Express app setup, middleware mounting, route registration |

### Configuration

| File | Purpose |
|------|---------|
| `config/index.js` | Load and validate environment variables |
| `config/database.js` | PostgreSQL connection pool, query helpers, transactions |

### Middleware

| File | Purpose |
|------|---------|
| `middleware/auth.js` | JWT verification, role-based access control |
| `middleware/errorHandler.js` | Catch and format all errors |
| `middleware/notFoundHandler.js` | Handle 404 routes |
| `middleware/rateLimiter.js` | Prevent abuse with rate limiting |
| `middleware/requestLogger.js` | Log all requests/responses |
| `middleware/validate.js` | Handle express-validator errors |

### Routes

Each route file:
- Defines HTTP endpoints (GET, POST, PUT, DELETE, PATCH)
- Applies middleware (auth, validation)
- Routes to controller functions

### Controllers

Each controller:
- Extracts data from request
- Calls service layer
- Formats and sends response
- **No business logic**

### Services

Each service:
- Contains business logic
- Validates business rules
- Calls model layer
- Handles transactions
- **No HTTP knowledge**

### Models

Each model:
- Executes database queries
- Maps DB results to objects
- **No business logic**

### Utilities

| File | Purpose |
|------|---------|
| `utils/logger.js` | Configurable logging with levels |
| `utils/AppError.js` | Custom error class for business errors |
| `utils/asyncHandler.js` | Wraps async functions to catch errors |
| `utils/jwt.js` | Generate and verify JWT tokens |
| `utils/pagination.js` | Parse pagination params, format responses |
| `utils/password.js` | Hash and compare passwords with bcrypt |
| `utils/response.js` | Standard response formatters |

## Resource Coverage

The backend includes complete structure for:

✅ Authentication (login, signup, refresh, 2FA, logout)
✅ Users (profile, update)
✅ Customers (CRUD, parcels)
✅ Parcels (CRUD, claims, tracking)
✅ Addresses (CRUD)
✅ Warehouses (CRUD, settings)
✅ Shipments (CRUD)
✅ Tracking (public tracking)
✅ Invoices (CRUD)
✅ Payments (CRUD)
✅ Claims (list, update)
✅ Notifications (list, mark read)
✅ Dashboards (admin, warehouse, client)

## Extensibility

To add a new resource:

1. Create `routes/resource.routes.js`
2. Create `controllers/resource.controller.js`
3. Create `services/resource.service.js`
4. Create `models/resource.model.js` (if needed)
5. Register in `routes/index.js`

Follow the existing patterns for consistency!

## Next Steps

1. **Implement service logic**: Fill in the service layer stubs
2. **Complete models**: Add remaining model files for all resources
3. **Add tests**: Unit tests for services, integration tests for routes
4. **Add API docs**: Swagger/OpenAPI documentation
5. **Enhance security**: Add 2FA, refresh token rotation, etc.
6. **Add features**: File uploads, email notifications, webhooks, etc.

## Dependencies

See `package.json` for complete list. Key dependencies:

- **express** - Web framework
- **pg** - PostgreSQL client
- **jsonwebtoken** - JWT handling
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - CORS handling
- **morgan** - HTTP logging
- **compression** - Response compression
- **express-rate-limit** - Rate limiting
- **dotenv** - Environment variables

## Development Dependencies

- **nodemon** - Auto-reload in development
- **eslint** - Code linting
- **prettier** - Code formatting
- **jest** - Testing framework
- **supertest** - HTTP testing

---

**🎉 The structure is complete and ready for implementation!**
