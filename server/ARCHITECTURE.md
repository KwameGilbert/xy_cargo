# Server Architecture Overview

## Architecture Pattern

This backend follows a **layered architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────┐
│             Client/Frontend                      │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          Middleware Layer                        │
│  • Authentication (JWT)                          │
│  • Authorization (RBAC)                          │
│  • Rate Limiting                                 │
│  • Validation                                    │
│  • Error Handling                                │
│  • Request Logging                               │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          Routes Layer                            │
│  • Define API endpoints                          │
│  • Route-specific middleware                     │
│  • Input validation rules                        │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          Controllers Layer                       │
│  • Handle HTTP requests                          │
│  • Parse request data                            │
│  • Call service layer                            │
│  • Format responses                              │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          Services Layer                          │
│  • Business logic                                │
│  • Data validation                               │
│  • Call multiple models if needed                │
│  • Transaction management                        │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          Models Layer                            │
│  • Database queries                              │
│  • Data access logic                             │
│  • Raw SQL or ORM                                │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          Database (PostgreSQL)                   │
└─────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Routes Layer (`src/routes/`)
**Purpose**: Define API endpoints and attach middleware

**Responsibilities**:
- Define HTTP methods and paths
- Attach authentication/authorization middleware
- Define validation rules
- Route to appropriate controller

**Example**:
```javascript
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
    validate,
  ],
  authController.login
);
```

### 2. Controllers Layer (`src/controllers/`)
**Purpose**: Handle HTTP requests and responses

**Responsibilities**:
- Extract data from request (body, params, query)
- Call appropriate service methods
- Handle success/error responses
- Format response data
- Should NOT contain business logic

**Example**:
```javascript
export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  successResponse(res, result);
};
```

### 3. Services Layer (`src/services/`)
**Purpose**: Implement business logic

**Responsibilities**:
- Core business logic
- Data validation and transformation
- Call one or more models
- Handle transactions
- Throw business-related errors
- Should NOT know about HTTP

**Example**:
```javascript
export const login = async (email, password) => {
  const user = await userModel.findByEmail(email);
  if (!user) throw new AppError('Invalid credentials', 401);
  
  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) throw new AppError('Invalid credentials', 401);
  
  const token = generateAccessToken({ id: user.id });
  return { token, user };
};
```

### 4. Models Layer (`src/models/`)
**Purpose**: Data access and database operations

**Responsibilities**:
- Execute database queries
- Map database results to JavaScript objects
- No business logic
- Should be reusable

**Example**:
```javascript
export const findByEmail = async (email) => {
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};
```

### 5. Middleware Layer (`src/middleware/`)
**Purpose**: Process requests before reaching controllers

**Responsibilities**:
- Authentication (verify JWT)
- Authorization (check permissions)
- Validation (input validation)
- Error handling
- Rate limiting
- Request logging

### 6. Utilities (`src/utils/`)
**Purpose**: Reusable helper functions

**Includes**:
- JWT utilities
- Password hashing
- Pagination helpers
- Logger
- Custom error classes
- Response formatters

## Data Flow Example

**Request**: `POST /api/v1/auth/login`

1. **Request** arrives at Express app
2. **Global Middleware** (helmet, cors, body parser, etc.)
3. **Route Middleware** (validation rules)
4. **Validation Middleware** checks input
5. **Controller** (`authController.login`)
   - Extracts email and password
   - Calls `authService.login(email, password)`
6. **Service** (`authService.login`)
   - Calls `userModel.findByEmail(email)`
   - Verifies password
   - Generates JWT token
   - Returns token and user data
7. **Controller** formats response
8. **Response** sent to client

## Error Handling

### Error Flow
```
Error occurs → Middleware catches → AppError or System Error
    ↓
errorHandler middleware
    ↓
Formatted JSON response
```

### Custom Errors
Use `AppError` class for predictable errors:
```javascript
throw new AppError('Resource not found', 404, 'NOT_FOUND');
```

### System Errors
Unexpected errors are caught and logged:
- Database errors
- Network errors
- Unhandled exceptions

## Authentication & Authorization

### Authentication Flow
1. Client sends credentials to `/auth/login`
2. Server validates credentials
3. Server generates JWT token
4. Client stores token
5. Client includes token in subsequent requests: `Authorization: Bearer <token>`
6. `authenticate` middleware verifies token
7. Request proceeds to controller

### Authorization Flow
1. After authentication, user info is in `req.user`
2. `authorize` middleware checks user roles
3. If authorized, request proceeds
4. If not, 403 Forbidden response

## Configuration Management

All configuration is centralized in `src/config/`:

- **index.js**: Main config, loads from environment variables
- **database.js**: Database connection and helpers

Environment-based configuration:
- Development: `.env` file
- Production: Environment variables

## Database Strategy

### Connection Pooling
- Uses `pg` connection pool
- Configurable pool size
- Automatic connection management

### Query Execution
```javascript
import { query } from '../config/database.js';
const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
```

### Transactions
```javascript
import { transaction } from '../config/database.js';

await transaction(async (client) => {
  await client.query('INSERT INTO table1 ...');
  await client.query('UPDATE table2 ...');
  // Auto-commits on success, rolls back on error
});
```

## Security Features

1. **Helmet**: Security headers
2. **CORS**: Controlled cross-origin access
3. **Rate Limiting**: Prevent abuse
4. **JWT**: Stateless authentication
5. **bcrypt**: Password hashing
6. **Input Validation**: express-validator
7. **SQL Parameterization**: Prevent SQL injection
8. **Error Handling**: No sensitive data leakage

## Scalability Considerations

### Horizontal Scaling
- Stateless design (JWT instead of sessions)
- No in-memory state
- Ready for load balancers

### Database Scaling
- Connection pooling
- Prepared statements
- Indexed queries (define in schema)

### Caching Strategy
- Can add Redis for:
  - Session storage
  - Rate limiting
  - Frequently accessed data

## Best Practices

### Code Organization
✅ **DO**:
- Keep functions small and focused
- One responsibility per function/class
- Use meaningful names
- Follow the layered architecture
- Handle errors properly

❌ **DON'T**:
- Put business logic in controllers
- Put HTTP logic in services
- Mix concerns between layers
- Use global state
- Ignore errors

### Error Handling
✅ **DO**:
- Use `AppError` for known errors
- Provide meaningful error messages
- Log errors with context
- Return consistent error format

❌ **DON'T**:
- Expose sensitive information in errors
- Swallow errors silently
- Use try-catch everywhere (use express-async-errors)

### Database
✅ **DO**:
- Use parameterized queries
- Use transactions for multiple operations
- Close connections properly (automatic with pool)
- Handle connection errors

❌ **DON'T**:
- Build SQL with string concatenation
- Execute queries in controllers
- Forget to handle connection errors

### Security
✅ **DO**:
- Validate all input
- Hash passwords
- Use JWT securely
- Implement rate limiting
- Use HTTPS in production

❌ **DON'T**:
- Trust user input
- Store plain text passwords
- Expose sensitive data in logs
- Skip authentication checks

## Testing Strategy

### Unit Tests
- Test services independently
- Mock database calls
- Test business logic

### Integration Tests
- Test API endpoints
- Use test database
- Test authentication/authorization

### Example Test Structure
```javascript
describe('Auth Service', () => {
  it('should login with valid credentials', async () => {
    const result = await authService.login('user@example.com', 'password');
    expect(result).toHaveProperty('token');
  });
  
  it('should reject invalid credentials', async () => {
    await expect(
      authService.login('user@example.com', 'wrong')
    ).rejects.toThrow('Invalid credentials');
  });
});
```

## Monitoring & Logging

### Logging Levels
- **error**: Critical errors
- **warn**: Warnings
- **info**: General info (default)
- **debug**: Detailed debug info

### What to Log
✅ Log:
- Errors with context
- Important business events
- Authentication attempts
- Slow queries

❌ Don't Log:
- Passwords
- Tokens
- Sensitive user data
- Unnecessary info in production

## Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set strong JWT secrets
- [ ] Configure CORS for production domains
- [ ] Enable HTTPS
- [ ] Set up process manager (PM2)
- [ ] Configure reverse proxy (nginx)
- [ ] Set up monitoring
- [ ] Configure logging
- [ ] Set up backups
- [ ] Review security headers
- [ ] Test rate limiting

## Future Enhancements

### Planned Improvements
1. **Caching**: Add Redis for performance
2. **File Upload**: S3 integration
3. **Email**: Email service integration
4. **Notifications**: Real-time via WebSocket
5. **API Documentation**: Swagger/OpenAPI
6. **Testing**: Comprehensive test suite
7. **CI/CD**: Automated testing and deployment
8. **Monitoring**: APM integration (e.g., New Relic)

### Extension Points
The architecture is designed to easily add:
- New resources (follow existing pattern)
- New middleware (plug into app.js)
- New authentication methods
- Background jobs (add job queue)
- Microservices (extract services)

## Conclusion

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Maintainable and testable code
- ✅ Scalability
- ✅ Security
- ✅ Performance
- ✅ Easy to extend

Follow the established patterns when adding new features to maintain consistency and quality.
