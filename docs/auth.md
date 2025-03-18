# Authentication & Authorization

## Overview

This document outlines the authentication and authorization mechanisms implemented in the JH Studio Backend application. The system uses JWT (JSON Web Tokens) for authentication and a role-based access control (RBAC) system for authorization.

## Authentication

### JWT Implementation

```typescript
interface JwtPayload {
  userId: number;
  email: string;
  roles: string[];
  companyId: number;
  iat: number;
  exp: number;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}
```

### Authentication Flow

1. **Login Process**
```typescript
// Login endpoint
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

// Success response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400,
  "tokenType": "Bearer"
}
```

2. **Token Refresh**
```typescript
// Refresh token endpoint
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

// Success response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400,
  "tokenType": "Bearer"
}
```

3. **Logout**
```typescript
// Logout endpoint
POST /api/v1/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

// Success response
{
  "message": "Successfully logged out"
}
```

### Authentication Middleware

```typescript
@Injectable()
class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.extractTokenFromHeader(req);
      const payload = await this.jwtService.verifyToken(token);
      req.user = payload;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
```

## Authorization

### Role-Based Access Control (RBAC)

1. **User Roles**
```typescript
enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
  USER = 'USER'
}

interface UserRoles {
  id: number;
  name: UserRole;
  permissions: Permission[];
}
```

2. **Permissions**
```typescript
enum Permission {
  // User management
  MANAGE_USERS = 'MANAGE_USERS',
  VIEW_USERS = 'VIEW_USERS',
  
  // Purchase management
  MANAGE_PURCHASES = 'MANAGE_PURCHASES',
  VIEW_PURCHASES = 'VIEW_PURCHASES',
  
  // Sales management
  MANAGE_SALES = 'MANAGE_SALES',
  VIEW_SALES = 'VIEW_SALES',
  
  // Inventory management
  MANAGE_INVENTORY = 'MANAGE_INVENTORY',
  VIEW_INVENTORY = 'VIEW_INVENTORY',
  
  // Report management
  MANAGE_REPORTS = 'MANAGE_REPORTS',
  VIEW_REPORTS = 'VIEW_REPORTS'
}
```

### Role Hierarchy

```typescript
const roleHierarchy = {
  SUPER_ADMIN: [
    ...Object.values(Permission)
  ],
  ADMIN: [
    Permission.MANAGE_USERS,
    Permission.VIEW_USERS,
    Permission.MANAGE_PURCHASES,
    Permission.VIEW_PURCHASES,
    Permission.MANAGE_SALES,
    Permission.VIEW_SALES,
    Permission.MANAGE_INVENTORY,
    Permission.VIEW_INVENTORY,
    Permission.MANAGE_REPORTS,
    Permission.VIEW_REPORTS
  ],
  MANAGER: [
    Permission.VIEW_USERS,
    Permission.MANAGE_PURCHASES,
    Permission.VIEW_PURCHASES,
    Permission.MANAGE_SALES,
    Permission.VIEW_SALES,
    Permission.MANAGE_INVENTORY,
    Permission.VIEW_INVENTORY,
    Permission.VIEW_REPORTS
  ],
  STAFF: [
    Permission.VIEW_PURCHASES,
    Permission.VIEW_SALES,
    Permission.VIEW_INVENTORY,
    Permission.VIEW_REPORTS
  ],
  USER: [
    Permission.VIEW_REPORTS
  ]
};
```

### Authorization Decorators

```typescript
// Role-based authorization
@Roles(UserRole.ADMIN, UserRole.MANAGER)
@Controller('purchases')
export class PurchaseController {
  @Post()
  @Roles(UserRole.ADMIN)
  createPurchase(@Body() data: CreatePurchaseDto) {
    // Only ADMIN can create purchases
  }
  
  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  listPurchases() {
    // ADMIN, MANAGER, and STAFF can view purchases
  }
}

// Permission-based authorization
@RequirePermissions(Permission.MANAGE_PURCHASES)
@Controller('purchases')
export class PurchaseController {
  @Post()
  @RequirePermissions(Permission.MANAGE_PURCHASES)
  createPurchase(@Body() data: CreatePurchaseDto) {
    // Requires MANAGE_PURCHASES permission
  }
  
  @Get()
  @RequirePermissions(Permission.VIEW_PURCHASES)
  listPurchases() {
    // Requires VIEW_PURCHASES permission
  }
}
```

### Authorization Guards

```typescript
@Injectable()
class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    const user = context.switchToHttp().getRequest().user;
    
    return this.matchRoles(roles, user.roles);
  }
}

@Injectable()
class PermissionsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<Permission[]>('permissions', context.getHandler());
    const user = context.switchToHttp().getRequest().user;
    
    return this.matchPermissions(permissions, user.permissions);
  }
}
```

## Security Features

### Password Management

```typescript
class PasswordService {
  // Hash password
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  
  // Verify password
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  
  // Generate reset token
  async generateResetToken(): Promise<string> {
    return crypto.randomBytes(32).toString('hex');
  }
}
```

### Rate Limiting

```typescript
@Injectable()
class RateLimitGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = this.generateKey(request);
    
    const limit = await this.rateLimiter.consume(key);
    
    if (limit.remainingPoints > 0) {
      return true;
    }
    
    throw new TooManyRequestsException();
  }
}
```

### Session Management

```typescript
interface Session {
  id: string;
  userId: number;
  deviceInfo: string;
  lastActivity: Date;
  isActive: boolean;
}

class SessionService {
  // Create session
  async createSession(userId: number, deviceInfo: string): Promise<Session>
  
  // Invalidate session
  async invalidateSession(sessionId: string): Promise<void>
  
  // Check session validity
  async isSessionValid(sessionId: string): Promise<boolean>
  
  // Update last activity
  async updateLastActivity(sessionId: string): Promise<void>
}
```

## Multi-tenancy

### Company-based Isolation

```typescript
@Injectable()
class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const companyId = req.user.companyId;
    req.tenant = { companyId };
    next();
  }
}

// Usage in services
class BaseService {
  protected async withTenant<T>(fn: (queryBuilder: SelectQueryBuilder<T>) => Promise<T>) {
    const queryBuilder = this.repository.createQueryBuilder();
    queryBuilder.where('companyId = :companyId', { companyId: this.tenant.companyId });
    return fn(queryBuilder);
  }
}
```

## Audit Logging

### Authentication Events

```typescript
enum AuthEvent {
  LOGIN_SUCCESS = 'auth.login.success',
  LOGIN_FAILURE = 'auth.login.failure',
  LOGOUT = 'auth.logout',
  TOKEN_REFRESH = 'auth.token.refresh',
  PASSWORD_RESET = 'auth.password.reset'
}

class AuthAuditService {
  async logAuthEvent(event: AuthEvent, userId: number, metadata: any) {
    await this.auditRepository.save({
      event,
      userId,
      metadata,
      timestamp: new Date()
    });
  }
}
```

## Best Practices

1. **Token Security**
   - Short-lived access tokens
   - Secure token storage
   - Token rotation
   - Blacklisting compromised tokens

2. **Password Security**
   - Strong password policy
   - Password hashing
   - Password expiration
   - Failed attempt lockout

3. **API Security**
   - HTTPS only
   - CORS configuration
   - Rate limiting
   - Input validation

4. **Session Security**
   - Session timeout
   - Session invalidation
   - Device tracking
   - Concurrent session limits

5. **Audit Trail**
   - Authentication logging
   - Authorization logging
   - Security event logging
   - Access pattern monitoring

## Error Handling

```typescript
class AuthenticationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 401
  ) {
    super(message);
  }
}

class AuthorizationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 403
  ) {
    super(message);
  }
}
```

Common error scenarios:
1. Invalid credentials
2. Expired token
3. Invalid token
4. Insufficient permissions
5. Rate limit exceeded
6. Session expired
7. Account locked 