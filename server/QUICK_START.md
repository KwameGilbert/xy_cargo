# Quick Start Guide

Get the XY Cargo server up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
# Minimum required configuration
NODE_ENV=development
PORT=5000
DB_NAME=xy_cargo
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key_at_least_32_characters_long
```

### 3. Setup Database
```bash
# Create database
createdb xy_cargo

# Run schema
psql xy_cargo < schema.sql
```

### 4. Start Server
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Server starts at: **http://localhost:5000**

## 🧪 Test the Server

### Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

### API Info
```bash
curl http://localhost:5000/api/v1
```

### Test Signup
```bash
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from the response!

### Test Protected Endpoint
```bash
curl http://localhost:5000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📁 Project Structure Overview

```
server/
├── src/
│   ├── config/         # Configuration
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   ├── models/         # Database queries
│   ├── utils/          # Helper functions
│   ├── app.js          # Express app
│   └── server.js       # Entry point
├── .env                # Your environment config
├── package.json        # Dependencies
└── README.md           # Full documentation
```

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start with auto-reload

# Production
npm start                # Start server

# Testing
npm test                 # Run tests (when available)

# Code Quality
npm run lint             # Check code style
npm run format           # Format code
```

## 🎯 Next Steps

1. **Read the Full Documentation**: [README.md](./README.md)
2. **Understand the Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
3. **Review API Specification**: [api_spec.md](./api_spec.md)
4. **Implement Database Models**: Complete the model layer
5. **Add Tests**: Write unit and integration tests
6. **Deploy**: Follow deployment checklist in README

## 🐛 Troubleshooting

### Port already in use
```bash
# Change port in .env
PORT=5001
```

### Database connection failed
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists: `createdb xy_cargo`

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### JWT errors in production
- Set a strong `JWT_SECRET` in production
- Use at least 32 characters
- Never commit secrets to git

## 📚 Learn More

- **Express.js**: https://expressjs.com/
- **PostgreSQL**: https://www.postgresql.org/
- **JWT**: https://jwt.io/
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices

## 💡 Tips

1. Use **Postman** or **Insomnia** for API testing
2. Check **logs** when debugging
3. Use `LOG_LEVEL=debug` for verbose output
4. Keep `.env` out of version control
5. Always validate user input
6. Test authentication before deployment

## 🎉 You're Ready!

The server is running and ready for development. Start building amazing features! 🚀

For questions, refer to:
- [README.md](./README.md) - Full documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture details
- [api_spec.md](./api_spec.md) - API reference
