# Development Setup Guide

## Prerequisites

Before setting up the development environment, ensure you have the following installed:

- Node.js (v16.x or higher)
- npm (v8.x or higher)
- MySQL (v8.x)
- Git

## Environment Setup

1. **Clone the Repository**
```bash
git clone [repository-url]
cd backend-jhstudio
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the root directory with the following variables:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=jhstudio_db

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=24h

# Email Configuration (if using email service)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Other Configurations
API_PREFIX=/api/v1
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

4. **Database Setup**
```bash
# Create database
mysql -u root -p
CREATE DATABASE jhstudio_db;

# Run migrations
npm run typeorm migration:run
```

## Development Workflow

### Starting the Development Server
```bash
# Start in development mode with hot reload
npm run dev

# Start in production mode
npm run start
```

### Code Quality Tools

1. **TypeScript Compilation**
```bash
# Check TypeScript compilation
npm run tsc

# Watch mode
npm run tsc:watch
```

2. **Linting**
```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

3. **Testing**
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test -- path/to/test/file
```

### Database Operations

1. **Migrations**
```bash
# Generate a new migration
npm run typeorm migration:generate -- -n MigrationName

# Create empty migration
npm run typeorm migration:create -- -n MigrationName

# Run pending migrations
npm run typeorm migration:run

# Revert last migration
npm run typeorm migration:revert
```

2. **Seeding (if implemented)**
```bash
# Run database seeds
npm run seed

# Run specific seeder
npm run seed:specific SeedName
```

## Debugging

### VS Code Configuration

Create a `.vscode/launch.json` file:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/index.ts",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

### Common Debug Commands
```bash
# Run with debug logs
DEBUG=* npm run dev

# Run specific module debug logs
DEBUG=app:* npm run dev
```

## API Testing

### Using Postman

1. Import the Postman collection from `postman/collection.json`
2. Set up environment variables in Postman
3. Use the pre-request scripts for authentication

### Using Curl

Example requests:
```bash
# Authentication
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "test"}'

# Protected route example
curl http://localhost:3000/api/v1/purchases \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Common Issues and Solutions

1. **Database Connection Issues**
   - Check if MySQL service is running
   - Verify database credentials in `.env`
   - Ensure database exists and user has proper permissions

2. **TypeORM Sync Issues**
   - Run `npm run typeorm schema:sync` to sync database schema
   - Check entity definitions for errors
   - Verify migration files are in correct order

3. **Node Module Issues**
   - Delete `node_modules` and package-lock.json
   - Run `npm cache clean --force`
   - Reinstall with `npm install`

## Best Practices

1. **Code Style**
   - Follow TypeScript best practices
   - Use meaningful variable and function names
   - Add JSDoc comments for complex functions
   - Keep functions small and focused

2. **Git Workflow**
   - Create feature branches from develop
   - Use conventional commit messages
   - Keep PRs focused and manageable in size
   - Squash commits before merging

3. **Error Handling**
   - Use custom error classes
   - Log errors appropriately
   - Return consistent error responses

4. **Security**
   - Never commit sensitive data
   - Use environment variables for secrets
   - Validate all user inputs
   - Implement rate limiting for APIs

## Contributing

Please refer to CONTRIBUTING.md for detailed guidelines on:
- Code style guide
- Branch naming conventions
- Commit message format
- Pull request process
- Code review guidelines 